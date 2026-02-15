import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Spam Protection: Honeypot check
    // If the hidden 'website' field is filled, it's likely a bot.
    if (body.website && body.website.trim() !== "") {
      console.warn("Spam detected via Honeypot. Discarding submission.");
      return NextResponse.json({ success: true, message: "Submission successful" });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Subject lines for different types of community activity
    const subject = body.type === "reply"
      ? `Ask Mo - New Reply on: ${body.questionTitle || "Thread"}`
      : `Ask Mo - New Community Question`;

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
        <div style="background: #00bc7c; color: #000; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 900; text-transform: uppercase;">New Community Interaction</h1>
        </div>
        <div style="padding: 30px; background: #fff;">
          <h2 style="color: #333; margin-top: 0;">${body.type === 'reply' ? 'Community Reply' : 'New Question Received'}</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; width: 120px;"><b>Name:</b></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #000;">${body.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;"><b>Email:</b></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #000;">${body.email}</td>
            </tr>
            ${body.category ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;"><b>Category:</b></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #000;">r/${body.category}</td>
            </tr>
            ` : ""}
            ${body.questionTitle ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;"><b>Thread:</b></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #000;">${body.questionTitle}</td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding: 20px 0 10px; color: #666;" colspan="2"><b>${body.type === 'reply' ? 'The Reply:' : 'The Question:'}</b></td>
            </tr>
            <tr>
              <td style="padding: 15px; background: #f9f9f9; border-radius: 8px; color: #333; line-height: 1.6;" colspan="2">
                ${body.content.replace(/\n/g, '<br>')}
              </td>
            </tr>
          </table>

          ${body.questionSlug ? `
          <div style="margin-top: 25px; text-align: center;">
            <a href="https://bettercallmo.dev/ask-mo/${body.questionSlug}" style="display: inline-block; background: #00bc7c; color: #000; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 900; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">
              View Discussion Thread
            </a>
          </div>
          ` : ""}
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999; font-style: italic;">
            This submission was sent via the Ask Mo Community Board.
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Ask Mo Community" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: subject,
      html: html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Ask Mo Email Error:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
