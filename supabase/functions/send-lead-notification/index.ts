import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface LeadNotificationRequest {
  name: string;
  phone: string;
  country_code: string;
  company: string;
  email?: string;
  source: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send lead notification");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const leadData: LeadNotificationRequest = await req.json();
    console.log("Lead data received:", leadData);

    const emailResponse = await resend.emails.send({
      from: "Haloo Connect <onboarding@resend.dev>",
      to: ["touheed.rahman@haloocom.com"],
      subject: `New Lead from ${leadData.source}: ${leadData.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #E11D24, #1A1F71); padding: 20px; border-radius: 8px 8px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1A1F71; }
            .value { color: #333; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎯 New Lead Received!</h1>
            </div>
            <div class="content">
              <p>A new lead has been submitted from <strong>${leadData.source}</strong>:</p>
              
              <div class="field">
                <span class="label">Name:</span>
                <span class="value">${leadData.name}</span>
              </div>
              
              <div class="field">
                <span class="label">Phone:</span>
                <span class="value">${leadData.country_code} ${leadData.phone}</span>
              </div>
              
              ${leadData.email ? `
              <div class="field">
                <span class="label">Email:</span>
                <span class="value">${leadData.email}</span>
              </div>
              ` : ''}
              
              <div class="field">
                <span class="label">Company:</span>
                <span class="value">${leadData.company}</span>
              </div>
              
              <div class="field">
                <span class="label">Source:</span>
                <span class="value">${leadData.source}</span>
              </div>
              
              <div class="field">
                <span class="label">Submitted At:</span>
                <span class="value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</span>
              </div>
            </div>
            <div class="footer">
              <p>This is an automated notification from Haloo Connect Lead System</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-lead-notification function:", error);
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
