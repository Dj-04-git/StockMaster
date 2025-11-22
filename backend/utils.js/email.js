const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
host: process.env.EMAIL_HOST,
port: Number(process.env.EMAIL_PORT) || 587,
secure: false,
auth: {
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS
}
});


// Generic sendMail function
async function sendMail({ to, subject, html, text }) {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
    html,
  });
  console.log('Message sent: %s', info.messageId);
  return info;
}

async function sendOtpEmail({ email, code }) {
  const verificationLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-otp?email=${email}&code=${code}`;

  const html = `
    <p>Hello,</p>
    <p>Your OTP code is: <b>${code}</b></p>
    <p>Or click the link below to verify your email directly:</p>
    <a href="${verificationLink}">Verify Email</a>
    <p>This OTP will expire in ${process.env.OTP_EXPIRES_MINUTES || 10} minutes.</p>
  `;

  return sendMail({
    to: email,
    subject: 'Verify Your Email',
    html,
  });
}


module.exports = { sendMail ,sendOtpEmail};