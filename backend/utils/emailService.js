const nodemailer = require("nodemailer");

let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      "Email service is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in backend .env"
    );
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: SMTP_SECURE === "true",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  return transporter;
};

const sendSignupOtpEmail = async (email, otp, name) => {
  const mailTransporter = getTransporter();
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;

  await mailTransporter.sendMail({
    from: `"Software Metrics Dashboard" <${from}>`,
    to: email,
    subject: "Verify your email - Signup OTP",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #1e293b; margin-bottom: 8px;">Email Verification</h2>
        <p style="color: #475569; line-height: 1.6;">
          Hi${name ? ` ${name}` : ""}, use the OTP below to complete your signup on
          <strong>Software Metrics Dashboard</strong>.
        </p>
        <div style="margin: 24px 0; padding: 16px 24px; background: #f1f5f9; border-radius: 12px; text-align: center;">
          <span style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #6366f1;">${otp}</span>
        </div>
        <p style="color: #64748b; font-size: 14px;">
          This OTP expires in <strong>10 minutes</strong>. Do not share it with anyone.
        </p>
      </div>
    `,
    text: `Your signup OTP is ${otp}. It expires in 10 minutes.`,
  });
};

module.exports = { sendSignupOtpEmail };
