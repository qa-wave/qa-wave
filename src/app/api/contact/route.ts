import { Resend } from "resend";

const RECIPIENT = process.env.CONTACT_EMAIL ?? "tomas.mertin@gmail.com";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not configured");
  return new Resend(key);
}

interface ContactPayload {
  name: string;
  email: string;
  company: string;
  role?: string;
  teamSize?: string;
  currentStack?: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    // Basic validation
    if (!body.name || !body.email || !body.company) {
      return Response.json(
        { error: "Name, email, and company are required." },
        { status: 400 },
      );
    }

    // Build email HTML
    const html = `
      <h2>New Discovery Call Request</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px">
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Name</td><td style="padding:8px;border-bottom:1px solid #eee">${esc(body.name)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Email</td><td style="padding:8px;border-bottom:1px solid #eee"><a href="mailto:${esc(body.email)}">${esc(body.email)}</a></td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Company</td><td style="padding:8px;border-bottom:1px solid #eee">${esc(body.company)}</td></tr>
        ${body.role ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Role</td><td style="padding:8px;border-bottom:1px solid #eee">${esc(body.role)}</td></tr>` : ""}
        ${body.teamSize ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">QA Team Size</td><td style="padding:8px;border-bottom:1px solid #eee">${esc(body.teamSize)}</td></tr>` : ""}
        ${body.currentStack ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Current Stack</td><td style="padding:8px;border-bottom:1px solid #eee">${esc(body.currentStack)}</td></tr>` : ""}
      </table>
      ${body.message ? `<h3 style="margin-top:24px">Challenge / Message</h3><p style="white-space:pre-wrap;background:#f5f5f5;padding:16px;border-radius:8px">${esc(body.message)}</p>` : ""}
      <hr style="margin-top:32px;border:none;border-top:1px solid #eee"/>
      <p style="color:#999;font-size:12px">Sent from qawave.ai contact form</p>
    `;

    const resend = getResend();
    const { data, error } = await resend.emails.send({
      from: "qawave.ai <onboarding@resend.dev>",
      to: [RECIPIENT],
      replyTo: body.email,
      subject: `Discovery Call Request — ${body.name} (${body.company})`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { error: "Failed to send email." },
        { status: 500 },
      );
    }

    return Response.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Contact API error:", err);
    return Response.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}

/** Escape HTML entities to prevent XSS in email */
function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
