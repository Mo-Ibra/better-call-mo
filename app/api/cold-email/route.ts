import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const html = buildHtmlTemplate(body);
    const text = buildTextVersion(body);

    await transporter.sendMail({
      from: `Mo - Web Developer <${process.env.EMAIL_USER}>`,
      to: body.email,
      subject: `${
        body.fullName ? body.fullName + ", " : ""
      }I thought this might help your business`,
      html,
      text,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cold Email Error:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

// ===== HTML Template Builder =====
type EmailTemplateData = {
  fullName?: string;
  company?: string;
  website?: string;
  email?: string;
};

function buildHtmlTemplate({ fullName, company, website }: EmailTemplateData) {
  const firstName = fullName ? fullName.split(" ")[0] : "there";

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
      <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
        
        <!-- Header with Image -->
        <div style="background:linear-gradient(135deg, #00bc7c 0%, #00a06d 100%);padding:40px 30px;text-align:center;">
          <img 
            src="${
              process.env.EMAIL_LOGO_URL ||
              "https://bettercallmo.dev/logo.png"
            }" 
            alt="Mo Logo" 
            style="width:80px;height:80px;margin:0 auto 20px;border-radius:50%;display:block;box-shadow:0 4px 12px rgba(0,0,0,0.15);"
          />
          <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:600;letter-spacing:-0.5px;">
            Better Call Mo
          </h1>
          <p style="margin:10px 0 0;color:rgba(255,255,255,0.9);font-size:14px;">
            Web Development & Design
          </p>
        </div>

        <!-- Main Content -->
        <div style="padding:40px 30px;">
          <p style="margin:0 0 20px;color:#1a1a1a;font-size:16px;line-height:1.6;">
            Hey <strong>${escapeHtml(firstName)}</strong>,
          </p>

          <p style="margin:0 0 20px;color:#4a4a4a;font-size:15px;line-height:1.7;">
            I hope this email finds you well. My name is <strong>Mo</strong>, and I'm a web developer who specializes in building modern, high-converting websites for businesses${
              company ? ` like <strong>${escapeHtml(company)}</strong>` : ""
            }.
          </p>

          ${
            website
              ? `
          <div style="background:#f8f9fa;border-left:4px solid #00bc7c;padding:16px 20px;margin:20px 0;border-radius:4px;">
            <p style="margin:0;color:#4a4a4a;font-size:14px;">
              I took a quick look at your website: <a href="${escapeHtml(
                website
              )}" style="color:#00bc7c;text-decoration:none;font-weight:500;">${escapeHtml(
                  website
                )}</a>
            </p>
          </div>
          `
              : ""
          }

          <p style="margin:20px 0;color:#4a4a4a;font-size:15px;line-height:1.7;">
            I noticed there might be some opportunities to enhance your online presence. I'd love to help you with:
          </p>

          <table style="width:100%;margin:20px 0;" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:12px 0;">
                <div style="display:flex;align-items:start;">
                  <span style="color:#00bc7c;font-size:20px;margin-right:12px;">✓</span>
                  <span style="color:#4a4a4a;font-size:15px;line-height:1.6;">
                    <strong>Modern Design</strong> that converts visitors into customers
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 0;">
                <div style="display:flex;align-items:start;">
                  <span style="color:#00bc7c;font-size:20px;margin-right:12px;">✓</span>
                  <span style="color:#4a4a4a;font-size:15px;line-height:1.6;">
                    <strong>Performance & SEO</strong> improvements to rank higher
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 0;">
                <div style="display:flex;align-items:start;">
                  <span style="color:#00bc7c;font-size:20px;margin-right:12px;">✓</span>
                  <span style="color:#4a4a4a;font-size:15px;line-height:1.6;">
                    <strong>Landing Pages</strong> optimized for conversions
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 0;">
                <div style="display:flex;align-items:start;">
                  <span style="color:#00bc7c;font-size:20px;margin-right:12px;">✓</span>
                  <span style="color:#4a4a4a;font-size:15px;line-height:1.6;">
                    <strong>Custom Solutions</strong> tailored to your business needs
                  </span>
                </div>
              </td>
            </tr>
          </table>

          <p style="margin:25px 0 20px;color:#4a4a4a;font-size:15px;line-height:1.7;">
            If this sounds interesting, feel free to reply to this email. I'd be happy to chat more about how I can help grow your business online.
          </p>

          <div style="margin:30px 0;padding:20px;background:#f8f9fa;border-radius:6px;text-align:center;">
            <a href="mailto:${
              process.env.EMAIL_USER
            }" style="display:inline-block;background:linear-gradient(135deg, #00bc7c 0%, #00a06d 100%);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:6px;font-weight:600;font-size:15px;box-shadow:0 2px 8px rgba(0,188,124,0.3);">
              Let's Talk
            </a>
          </div>

          <!-- Signature -->
          <div style="margin-top:40px;padding-top:30px;border-top:1px solid #e5e5e5;">
            <p style="margin:0 0 8px;color:#1a1a1a;font-size:16px;font-weight:600;">
              Best regards,
            </p>
            <p style="margin:0 0 6px;color:#1a1a1a;font-size:16px;font-weight:600;">
              Mo
            </p>
            <p style="margin:0;color:#666;font-size:14px;">
              Web Developer & Designer
            </p>
            <p style="margin:6px 0 0;color:#00bc7c;font-size:14px;">
              <a href="mailto:${
                process.env.EMAIL_USER
              }" style="color:#00bc7c;text-decoration:none;">${
    process.env.EMAIL_USER
  }</a>
            </p>
          </div>

          <!-- PS Note -->
          <div style="margin-top:25px;padding:16px;background:#fffbf0;border-left:3px solid #ffa500;border-radius:4px;">
            <p style="margin:0;color:#8b6914;font-size:13px;line-height:1.5;">
              <strong>P.S.</strong> If you'd prefer a quick 15-minute call instead, just let me know a time that works for you. No pressure at all!
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background:#f8f9fa;padding:20px 30px;text-align:center;border-top:1px solid #e5e5e5;">
          <p style="margin:0;color:#999;font-size:12px;line-height:1.5;">
            You received this email because I thought we might be a good fit to work together.
            <br>If you're not interested, no worries—just let me know and I won't reach out again.
          </p>
        </div>
      </div>
    </body>
  </html>
  `;
}

// ===== TEXT VERSION (fallback) =====
function buildTextVersion({ fullName, company, website }: EmailTemplateData) {
  const firstName = fullName ? fullName.split(" ")[0] : "there";

  return `Hey ${firstName},

I hope this email finds you well. My name is Mo, and I'm a web developer who specializes in building modern, high-converting websites for businesses${
    company ? ` like ${company}` : ""
  }.

${website ? `I took a quick look at your website: ${website}` : ""}

I'd love to help you with:
• Modern Design that converts visitors into customers
• Performance & SEO improvements to rank higher
• Landing Pages optimized for conversions
• Custom Solutions tailored to your business needs

If this sounds interesting, feel free to reply to this email. I'd be happy to chat more about how I can help grow your business online.

Best regards,
Mo
Web Developer & Designer
${process.env.EMAIL_USER}

P.S. If you'd prefer a quick 15-minute call instead, just let me know a time that works for you. No pressure at all!`;
}

// ===== HTML Escaping Utility =====
function escapeHtml(str: string) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
