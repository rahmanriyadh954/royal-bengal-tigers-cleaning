import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  // Console e check korum data ashche ki na
  console.log("--- STARTING MAIL DEPLOYMENT ---");
  
  try {
    const body = await req.json();
    console.log("PAYLOAD_RECEIVED:", body);

    // Direct Transporter - kono jhamela chara
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Check space in .env.local
      },
      tls: {
        rejectUnauthorized: false // Local network issue bypass korar jonno
      }
    });

    // 1. Connection Check (Terminal e dekhbi error dey naki)
    await transporter.verify();
    console.log("SMTP_CONNECTION: SUCCESSFUL");

    const mailOptions = {
      from: `"RBT Verification" <${process.env.EMAIL_USER}>`,
      to: "riyadrahman315@gmail.com", 
      subject: `[RBT-DEPLOY] - Verification Alert`,
      html: `
        <div style="background:#000; color:#fff; padding:20px; border:1px solid #EAB308;">
          <h2 style="color:#EAB308;">INDUSTRIAL LOG REPORT</h2>
          <p><strong>Operative:</strong> ${body.name}</p>
          <p><strong>Site:</strong> ${body.siteNode || 'TAS-HQ'}</p>
          <p><strong>Message:</strong> ${body.message}</p>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("MAIL_SENT_ID:", result.messageId);

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("--- SYSTEM_FAILURE_LOG ---");
    console.error("ERROR_MSG:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}