import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { fileURLToPath } from "node:url"

dotenv.config({ path: fileURLToPath(new URL("../../.env", import.meta.url)) })

const { SMTP_USER, SMTP_PASS } = process.env
if (!SMTP_USER || !SMTP_PASS) {
  throw new Error("SMTP_USER and SMTP_PASS must be set in backend/.env")
}

let name = "rayyan"


const transporter = nodemailer.createTransport({
    host : "smtp.gmail.com",
    port : 587,
    secure : false,
  service : "gmail",
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

let verfiyMailOpt = `<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
  <h2>Verify Your Email Address</h2>

  <p>Hi ${name},</p>

  <p>
    Thanks for signing up! Please click the button below to
    verify your email address and activate your account.
  </p>

  <a
    href="{{verificationUrl}}"
    style="
      display: inline-block;
      padding: 12px 24px;
      background-color: #4f46e5;
      color: #ffffff;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
    "
  >
    Verify Email
  </a>

  <p>This link will expire in 15 minutes.</p>

  <p>
    If you didn't create an account, you can safely ignore
    this email.
  </p>

  <p>Thanks,<br />The SpaceMatrix Team</p>
</div>`















const sendMail = async (to,subject,options)=>{

    try {
  const info = await transporter.sendMail({
    from: SMTP_USER, // sender address
    to, // list of recipients
    subject, // subject line
    text : "hello world",
    html: options, // HTML body
  });

  console.log("SMTP accepted message:", {
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
    response: info.response,
  });
} catch (err) {
  console.error("Error while sending mail:", err);
  throw err;
}


}





await sendMail("amoghvp1914@gmail.com","test mail",verfiyMailOpt)