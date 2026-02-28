import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReportRequest {
  fullName: string;
  email: string;
  companyName: string;
  website: string;
  businessType: string;
  score: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ReportRequest = await req.json();

    // Send notification to admin
    await resend.emails.send({
      from: "Haloo Connect <onboarding@resend.dev>",
      to: ["touheed.rahman@haloocom.com"],
      subject: `New Analysis Lead: ${data.companyName} (Score: ${data.score}/100)`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #E11D24, #1A1F71); padding: 20px; border-radius: 8px 8px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 20px; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 12px; }
            .label { font-weight: bold; color: #1A1F71; }
            .score { font-size: 32px; font-weight: bold; color: #E11D24; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New AI Readiness Analysis Lead</h1>
            </div>
            <div class="content">
              <div class="field"><span class="label">Name:</span> ${data.fullName}</div>
              <div class="field"><span class="label">Email:</span> ${data.email}</div>
              <div class="field"><span class="label">Company:</span> ${data.companyName}</div>
              <div class="field"><span class="label">Website:</span> ${data.website}</div>
              <div class="field"><span class="label">Business Type:</span> ${data.businessType}</div>
              <div class="field"><span class="label">Readiness Score:</span> <span class="score">${data.score}/100</span></div>
              <div class="field"><span class="label">Submitted:</span> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
