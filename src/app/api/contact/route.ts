import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const {
      type,
      name,
      email,
      contact,
      company,
      website,
      partnershipType,
      investorType,
      firm,
      linkedin,
      message,
    } = await req.json();

    if (!type || !name || !email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    /* ================= EMAIL META ================= */
    const TYPE_MAP: Record<string, { subject: string; title: string }> = {
      beta: {
        subject: "New Join Beta Request",
        title: "New Beta User Request",
      },
      partner: {
        subject: "New Partnership Request",
        title: "New Partner Inquiry",
      },
      invest: {
        subject: "New Investor Interest",
        title: "New Investment Inquiry",
      },
    };

    const emailMeta = TYPE_MAP[type] || TYPE_MAP.beta;

    /* ================= TRANSPORT ================= */
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

    /* ================= EXTRA FIELDS ================= */
    let extraFields = "";

    if (type === "partner") {
      extraFields = `
        <p><b>Company:</b> ${company || "—"}</p>
        <p><b>Website:</b> ${website || "—"}</p>
        <p><b>Partnership Type:</b> ${partnershipType || "—"}</p>
      `;
    }

    if (type === "invest") {
      extraFields = `
        <p><b>Investor Type:</b> ${investorType || "—"}</p>
        <p><b>Firm:</b> ${firm || "—"}</p>
        <p><b>LinkedIn / Website:</b> ${linkedin || "—"}</p>
      `;
    }

    /* ================= SEND MAIL ================= */
    await transporter.sendMail({
      from: `"HypeOn AI" <${process.env.EMAIL_USER}>`,
      to: "info@hypeon.ai", 
      replyTo: email,
      subject: emailMeta.subject,
      html: `
        <h2>${emailMeta.title}</h2>
        <hr />
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        ${contact ? `<p><b>Phone:</b> ${contact}</p>` : ""}
        <p><b>Form Type:</b> ${type.toUpperCase()}</p>
        ${extraFields}
        <p><b>Message:</b><br/>${message || "—"}</p>
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
