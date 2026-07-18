import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const fromEmail = Deno.env.get("FROM_EMAIL") || "Haloo Connect <no-reply@haloocom.com>";
const adminLeadEmail = Deno.env.get("ADMIN_LEAD_EMAIL") || "haloocom.com@gmail.com";
const supportEmail = Deno.env.get("SUPPORT_EMAIL") || "enquiry@haloocom.com";
const siteUrl = Deno.env.get("SITE_URL") || "connect.haloocom.com";

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
  email?: string | null;
  source: string;
  location?: string;
  city?: string;
  message?: string | null;
}

const escapeHtml = (value?: string | null) =>
  String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const isValidEmail = (email?: string | null) =>
  Boolean(email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()));

const formatSubmittedAt = () =>
  new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send lead notification");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const leadData: LeadNotificationRequest = await req.json();
    console.log("Lead data received:", leadData);

    const submittedAt = formatSubmittedAt();
    const customerEmail = leadData.email?.trim() || "";
    const customerEmailIsValid = isValidEmail(customerEmail);

    const safeLead = {
      name: escapeHtml(leadData.name),
      phone: escapeHtml(leadData.phone),
      countryCode: escapeHtml(leadData.country_code),
      company: escapeHtml(leadData.company || "Not provided"),
      email: escapeHtml(customerEmail),
      source: escapeHtml(leadData.source),
      location: escapeHtml(leadData.location || "Not provided"),
      city: escapeHtml(leadData.city),
      message: escapeHtml(leadData.message),
      submittedAt: escapeHtml(submittedAt),
      supportEmail: escapeHtml(supportEmail),
      siteUrl: escapeHtml(siteUrl),
    };

    const adminEmailResponse = await resend.emails.send({
      from: fromEmail,
      to: [adminLeadEmail],
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
            .value { color: #333; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Lead Received</h1>
            </div>
            <div class="content">
              <p>A new lead has been submitted from <strong>${safeLead.source}</strong> on <strong>${safeLead.siteUrl}</strong>:</p>

              <div class="field">
                <span class="label">Name:</span>
                <span class="value">${safeLead.name}</span>
              </div>

              <div class="field">
                <span class="label">Phone:</span>
                <span class="value">${safeLead.countryCode} ${safeLead.phone}</span>
              </div>

              ${customerEmailIsValid ? `
              <div class="field">
                <span class="label">Email:</span>
                <span class="value">${safeLead.email}</span>
              </div>
              ` : ""}

              <div class="field">
                <span class="label">Company:</span>
                <span class="value">${safeLead.company}</span>
              </div>

              <div class="field">
                <span class="label">Location:</span>
                <span class="value">${safeLead.location}</span>
              </div>

              ${leadData.city ? `
              <div class="field">
                <span class="label">City:</span>
                <span class="value">${safeLead.city}</span>
              </div>
              ` : ""}

              ${leadData.message ? `
              <div class="field">
                <span class="label">Message:</span>
                <div class="value">${safeLead.message.replaceAll("\n", "<br />")}</div>
              </div>
              ` : ""}

              <div class="field">
                <span class="label">Source:</span>
                <span class="value">${safeLead.source}</span>
              </div>

              <div class="field">
                <span class="label">Website:</span>
                <span class="value">${safeLead.siteUrl}</span>
              </div>

              <div class="field">
                <span class="label">Submitted At:</span>
                <span class="value">${safeLead.submittedAt}</span>
              </div>
            </div>
            <div class="footer">
              <p>This is an automated notification from Haloo Connect Lead System.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (adminEmailResponse.error) {
      throw new Error(adminEmailResponse.error.message || "Failed to send admin lead email");
    }

    console.log("Admin lead email sent successfully:", adminEmailResponse.data);

    let customerEmailSent = false;
    let customerEmailError: string | null = null;

    if (customerEmailIsValid) {
      const customerEmailResponse = await resend.emails.send({
        from: fromEmail,
        to: [customerEmail],
        subject: "Thank you for contacting Haloo Connect",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #E11D24, #1A1F71); padding: 24px; border-radius: 8px 8px 0 0; }
              .header h1 { color: white; margin: 0; font-size: 24px; }
              .content { background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
              a { color: #E11D24; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thank you for contacting Haloo Connect</h1>
              </div>
              <div class="content">
                <p>Hi ${safeLead.name || "there"},</p>
                <p>Thank you for reaching out to Haloo Connect. We have received your request and our team will contact you shortly.</p>
                <p>If you need to add anything before we call, you can write to us at <a href="mailto:${safeLead.supportEmail}">${safeLead.supportEmail}</a>.</p>
                <p>Regards,<br />Team Haloo Connect</p>
              </div>
              <div class="footer">
                <p>This is an automated confirmation email from Haloo Connect.</p>
              </div>
            </div>
          </body>
          </html>
        `,
      });

      if (customerEmailResponse.error) {
        customerEmailError = customerEmailResponse.error.message || "Failed to send customer thank-you email";
        console.error("Customer thank-you email failed:", customerEmailResponse.error);
      } else {
        customerEmailSent = true;
        console.log("Customer thank-you email sent successfully:", customerEmailResponse.data);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        adminEmailSent: true,
        customerEmailSent,
        customerEmailSkipped: !customerEmailIsValid,
        customerEmailError,
        data: adminEmailResponse.data,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
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
