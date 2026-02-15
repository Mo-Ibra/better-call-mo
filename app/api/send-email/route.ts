import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check (5 per hour)
    const ip = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for") || "unknown";
    const { allowed, remaining } = checkRateLimit(ip);

    if (!allowed) {
      console.warn(`Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again in an hour." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Spam Protection: Honeypot check
    if (body.fax && body.fax.trim() !== "") {
      console.warn("Contact form spam detected via Honeypot.");
      return NextResponse.json({ success: true, message: "Request received" });
    }

    // Send Email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Better Call Mo" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "Better Call Mo - New Submission",
      html: `
        <h2>New Submission</h2>
        <p><b>IP Address:</b> ${ip}</p>
        <p><b>Full Name:</b> ${body.fullName}</p>
        <p><b>Email:</b> ${body.email}</p>
        <p><b>Project Type:</b> ${body.projectType}</p>
        <p><b>Niche:</b> ${body.niche}</p>
        <p><b>Has Website:</b> ${body.hasWebsite}</p>
        <p><b>Website:</b> ${body.website || "N/A"}</p>
        <p><b>Services:</b> ${body.services.length ? body.services.join(", ") : "N/A"
        }</p>
        <p><b>Budget:</b> $${body.budget}</p>
        <p><b>Message:</b> ${body.message || "No message provided"}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
