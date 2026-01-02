import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
const RECAPTCHA_SECRET_KEY = Deno.env.get("RECAPTCHA_SECRET_KEY");
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "no-reply@hyrx.tech";
const REPLY_TO_EMAIL = Deno.env.get("REPLY_TO_EMAIL") || "contact@hyrx.tech";
const INTERNAL_NOTIFY_EMAIL = Deno.env.get("INTERNAL_NOTIFY_EMAIL") || "hyrx.aistudio@gmail.com";

// HTML escape function to prevent injection attacks
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Allowed origins for CORS - restrict to production and development
const ALLOWED_ORIGINS = [
  "https://hyrx.tech",
  "https://www.hyrx.tech",
  "http://localhost:5173",
  "http://localhost:8080",
];

// Get CORS headers with origin validation
const getCorsHeaders = (origin: string | null): Record<string, string> => {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
};

// Input validation schema with strict constraints
const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long").trim(),
  email: z.string().email("Invalid email address").max(255, "Email too long"),
  company: z.string().max(100, "Company name too long").optional().nullable(),
  services: z.array(z.string().max(50)).max(10, "Too many services").default([]),
  budget: z.string().max(50, "Budget value too long").optional().nullable().default(""),
  message: z.string().min(1, "Message is required").max(5000, "Message too long (max 5000 characters)").trim(),
  recaptchaToken: z.string().min(20, "Invalid reCAPTCHA token").max(2000, "Invalid reCAPTCHA token")
});

// Send email via Brevo SMTP API
async function sendBrevoEmail(params: {
  to: { email: string; name?: string }[];
  from: { email: string; name: string };
  replyTo?: { email: string };
  subject: string;
  htmlContent: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: params.from,
        to: params.to,
        replyTo: params.replyTo,
        subject: params.subject,
        htmlContent: params.htmlContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Brevo API error:", response.status, errorText);
      return { success: false, error: errorText };
    }

    const result = await response.json();
    console.log("Brevo email sent:", result);
    return { success: true };
  } catch (error: any) {
    console.error("Brevo send error:", error.message);
    return { success: false, error: error.message };
  }
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Validate input with Zod schema
    const validationResult = ContactFormSchema.safeParse(body);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      console.error("Input validation failed:", validationResult.error.errors);
      return new Response(
        JSON.stringify({ success: false, error: firstError?.message || "Invalid input" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    const { name, email, company, services, budget, message, recaptchaToken } = validationResult.data;

    // Verify reCAPTCHA token
    const recaptchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });

    const recaptchaResult = await recaptchaResponse.json();
    console.log("reCAPTCHA verification result:", recaptchaResult);

    if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
      console.error("reCAPTCHA verification failed:", recaptchaResult);
      return new Response(
        JSON.stringify({ success: false, error: "Spam detection triggered. Please try again." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Received contact form submission:", { name, email, company, services, budget });

    // Initialize Supabase client with service role for database insert
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Save submission to database
    const { data: dbData, error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        name: name.trim(),
        email: email.trim(),
        company: company?.trim() || null,
        services: services || [],
        budget: budget || null,
        message: message.trim(),
        status: "pending",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Failed to save submission to database:", dbError);
      // Continue with email sending even if DB insert fails
    } else {
      console.log("Submission saved to database with ID:", dbData.id);
    }

    // Format services list
    const servicesList = services && services.length > 0 
      ? services.map(s => {
          const labels: Record<string, string> = {
            "ai-agents": "AI Agents & Automations",
            "chatbots": "Custom AI Chatbots",
            "3d-ar": "3D & AR Modelling",
            "other": "Other",
          };
          return labels[s] || s;
        }).join(", ")
      : "Not specified";

    // Format budget
    const budgetLabels: Record<string, string> = {
      "1k-5k": "$1,000 - $5,000",
      "5k-15k": "$5,000 - $15,000",
      "15k-30k": "$15,000 - $30,000",
      "50k+": "$50,000+",
      "not-sure": "Not sure yet",
    };
    const budgetLabel = budget ? (budgetLabels[budget] || budget) : "Not specified";

    // 1. Send user confirmation email (From no-reply@hyrx.tech, reply-to contact@hyrx.tech)
    const userConfirmationHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #111111; border-radius: 12px; overflow: hidden;">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid #222;">
                    <h1 style="margin: 0; color: #22d3ee; font-size: 28px; font-weight: 700;">HYRX Studio</h1>
                  </td>
                </tr>
                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="margin: 0 0 20px; color: #ffffff; font-size: 24px; font-weight: 600;">Thanks for reaching out, ${escapeHtml(name)}!</h2>
                    <p style="margin: 0 0 20px; color: #a1a1aa; font-size: 16px; line-height: 1.6;">
                      We've received your project request and our team is excited to review it. We typically respond within 24-48 hours.
                    </p>
                    
                    <!-- Request Summary -->
                    <div style="background-color: #1a1a1a; border-radius: 8px; padding: 24px; margin: 24px 0;">
                      <h3 style="margin: 0 0 16px; color: #22d3ee; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Your Request Summary</h3>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding: 8px 0; color: #71717a; font-size: 14px;">Services:</td>
                          <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right;">${servicesList}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #71717a; font-size: 14px;">Budget Range:</td>
                          <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right;">${budgetLabel}</td>
                        </tr>
                        ${company ? `
                        <tr>
                          <td style="padding: 8px 0; color: #71717a; font-size: 14px;">Company:</td>
                          <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right;">${escapeHtml(company)}</td>
                        </tr>
                        ` : ''}
                      </table>
                    </div>

                    <p style="margin: 24px 0 0; color: #a1a1aa; font-size: 16px; line-height: 1.6;">
                      In the meantime, feel free to explore our work at <a href="https://hyrx.tech/work" style="color: #22d3ee; text-decoration: none;">hyrx.tech/work</a>.
                    </p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 40px; background-color: #0a0a0a; border-top: 1px solid #222;">
                    <p style="margin: 0 0 8px; color: #71717a; font-size: 14px;">Best regards,</p>
                    <p style="margin: 0 0 16px; color: #ffffff; font-size: 16px; font-weight: 600;">The HYRX Studio Team</p>
                    <p style="margin: 0; color: #52525b; font-size: 12px;">
                      <a href="https://hyrx.tech" style="color: #52525b; text-decoration: none;">hyrx.tech</a> · 
                      <a href="mailto:${REPLY_TO_EMAIL}" style="color: #52525b; text-decoration: none;">${REPLY_TO_EMAIL}</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const userEmailResult = await sendBrevoEmail({
      to: [{ email: email, name: name }],
      from: { email: FROM_EMAIL, name: "HYRX Studio" },
      replyTo: { email: REPLY_TO_EMAIL },
      subject: "We received your request — HYRX Studio",
      htmlContent: userConfirmationHtml,
    });

    if (!userEmailResult.success) {
      console.error("Failed to send user confirmation email:", userEmailResult.error);
      // Continue to send internal notification even if user email fails
    } else {
      console.log("User confirmation email sent successfully to", email);
    }

    // 2. Send internal notification email (reply-to set to user's email for quick reply)
    const internalNotificationHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body style="margin: 0; padding: 20px; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h1 style="margin: 0 0 24px; color: #0a0a0a; font-size: 24px;">New Quote Request</h1>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;">
          
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 15px;">
            <tr>
              <td style="padding: 12px 0; color: #666; width: 120px; vertical-align: top;">Name:</td>
              <td style="padding: 12px 0; color: #0a0a0a; font-weight: 500;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #666; vertical-align: top;">Email:</td>
              <td style="padding: 12px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #0891b2; text-decoration: none;">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #666; vertical-align: top;">Company:</td>
              <td style="padding: 12px 0; color: #0a0a0a;">${company ? escapeHtml(company) : "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #666; vertical-align: top;">Services:</td>
              <td style="padding: 12px 0; color: #0a0a0a;">${servicesList}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #666; vertical-align: top;">Budget:</td>
              <td style="padding: 12px 0; color: #0a0a0a; font-weight: 500;">${budgetLabel}</td>
            </tr>
          </table>
          
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;">
          
          <h2 style="margin: 0 0 12px; color: #0a0a0a; font-size: 16px;">Message:</h2>
          <div style="background: #f9f9f9; border-radius: 6px; padding: 16px; color: #333; line-height: 1.6;">
            ${escapeHtml(message).replace(/\n/g, "<br>")}
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;">
          
          <p style="margin: 0; color: #999; font-size: 13px;">
            Reply directly to this email to respond to ${escapeHtml(name)}
          </p>
        </div>
      </body>
      </html>
    `;

    const internalEmailResult = await sendBrevoEmail({
      to: [{ email: INTERNAL_NOTIFY_EMAIL }],
      from: { email: FROM_EMAIL, name: "HYRX Website" },
      replyTo: { email: email }, // Reply goes directly to the user
      subject: `New quote request from ${name} — HYRX`,
      htmlContent: internalNotificationHtml,
    });

    if (!internalEmailResult.success) {
      console.error("Failed to send internal notification email:", internalEmailResult.error);
      // Return success anyway - DB has the submission, user got confirmation
      // Don't fail the UI for internal email issues
    } else {
      console.log("Internal notification email sent successfully to", INTERNAL_NOTIFY_EMAIL);
    }

    // Always return success if we got this far - submission is saved
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Something went wrong. Please email us directly at contact@hyrx.tech",
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
