import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, contact, message } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

   
    await transporter.verify();

    await transporter.sendMail({
      from: `"Hypeon Beta" <${process.env.EMAIL_USER}>`,
      to: "info@hypeon.ai",
      replyTo: email, 
      subject: "New Join Beta Request",
      html: `
        <h3>New Beta User</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${contact || "—"}</p>
        <p><b>Message:</b> ${message || "—"}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("EMAIL ERROR:", err); 
    return NextResponse.json(
      { success: false, error: err?.message || "Email failed" },
      { status: 500 }
    );
  }
}
