import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

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
    const { name, email, company, services, budget, message }: ContactEmailRequest = await req.json();

    console.log("Received contact form submission:", { name, email, company, services, budget });

    // Format services list
    const servicesList = services.length > 0 
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

    // Send notification email to the business
    const notificationRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "HXY Studio <onboarding@resend.dev>",
        to: ["hyrx.aistudio@gmail.com"],
        reply_to: email,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || "Not provided"}</p>
          <p><strong>Services of Interest:</strong> ${servicesList}</p>
          <p><strong>Budget Range:</strong> ${budgetLabel}</p>
          <h2>Message:</h2>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      }),
    });

    if (!notificationRes.ok) {
      const error = await notificationRes.text();
      console.error("Failed to send notification email:", error);
      throw new Error(`Failed to send notification email: ${error}`);
    }

    console.log("Notification email sent successfully");

    // Send confirmation email to the user
    const confirmationRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "HXY Studio <onboarding@resend.dev>",
        to: [email],
        subject: "We received your message!",
        html: `
          <h1>Thank you for contacting us, ${name}!</h1>
          <p>We have received your message and will get back to you within 1-2 business days.</p>
          <h2>Your submission:</h2>
          <p><strong>Services of Interest:</strong> ${servicesList}</p>
          <p><strong>Budget Range:</strong> ${budgetLabel}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <br>
          <p>Best regards,<br>The HXY Studio Team</p>
        `,
      }),
    });

    if (!confirmationRes.ok) {
      const error = await confirmationRes.text();
      console.error("Failed to send confirmation email:", error);
      // Don't throw here - notification was sent, user confirmation is secondary
    } else {
      console.log("Confirmation email sent successfully");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
