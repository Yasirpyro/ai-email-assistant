import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const INTERNAL_EMAIL = "hyrx.aistudio@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  company?: string;
  services: string[];
  budget: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { name, email, company, services, budget, message }: ContactEmailRequest = body;

    // Basic validation
    if (!email || !email.includes("@")) {
      return new Response(
        JSON.stringify({ success: false, error: "Valid email is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!message || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Message is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!name || name.trim().length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Name is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Received contact form submission:", { name, email, company, services, budget });

    // Format services list
    const servicesList = services && services.length > 0 
      ? services.map(s => {
          const labels: Record<string, string> = {
            "ai-agents": "AI Agents & Automations",
            "chatbots": "Custom AI Chatbots",
            "3d-ar": "3D & AR Modelling",
          };
          return labels[s] || s;
        }).join(", ")
      : "Not specified";

    // Format budget
    const budgetLabels: Record<string, string> = {
      "15k-30k": "$15,000 - $30,000",
      "30k-50k": "$30,000 - $50,000",
      "50k-100k": "$50,000 - $100,000",
      "100k+": "$100,000+",
      "not-sure": "Not sure yet",
    };
    const budgetLabel = budgetLabels[budget] || budget || "Not specified";

    // Send ONLY internal notification email to verified account
    // No user confirmation email until domain is verified
    const notificationRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "HYRX Studio <onboarding@resend.dev>",
        to: [INTERNAL_EMAIL], // Always send to internal email only
        reply_to: email, // User's email for easy reply from Gmail
        subject: `New quote request — HYRX`,
        html: `
          <h1>New Quote Request</h1>
          <hr/>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Company:</strong> ${company || "Not provided"}</p>
          <p><strong>Services of Interest:</strong> ${servicesList}</p>
          <p><strong>Budget Range:</strong> ${budgetLabel}</p>
          <hr/>
          <h2>Message:</h2>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <hr/>
          <p style="color: #666; font-size: 12px;">
            Reply directly to this email to respond to ${name} at ${email}
          </p>
        `,
      }),
    });

    if (!notificationRes.ok) {
      const errorText = await notificationRes.text();
      console.error("Failed to send internal notification email:", errorText);
      
      // Return success:false but NOT a 500 - let frontend handle gracefully
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Email delivery issue. Please try again or contact us directly.",
          fallbackEmail: INTERNAL_EMAIL
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Internal notification email sent successfully to", INTERNAL_EMAIL);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    
    // Return 200 with success:false for graceful frontend handling
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Something went wrong. Please email us directly.",
        fallbackEmail: INTERNAL_EMAIL
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
