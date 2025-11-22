const User = require('../models/User');
const { generateJwt } = require('../Utils.js/generateTokens.js');
const { sendMail, sendOtpEmail } = require('../Utils.js/email.js');
const { v4: uuidv4 } = require('uuid');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function randomOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ---------------------- SIGNUP ----------------------
exports.signup = async (req, res) => {
  try {
    const { email, loginId, password } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ msg: "Email already exists" });

    const code = randomOTP();
    const expiresAt = new Date(Date.now() + (Number(process.env.OTP_EXPIRES_MINUTES || 10) * 60 * 1000));

    const user = await User.create({
      email,
      loginId,
      password,
      otpCode: code,
      otpExpiresAt: expiresAt,
      isVerified: false
    });

    // Send OTP email with link
    await sendOtpEmail({ email, code });

    res.json({ msg: "OTP sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error creating user" });
  }
};

// ---------------------- VERIFY OTP LINK ----------------------
exports.verifyOtpLink = async (req, res) => {
  try {
    const { email, code } = req.query;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).send("No user found");
    if (!user.otpCode || !user.otpExpiresAt) return res.status(400).send("No OTP present");
    if (new Date() > user.otpExpiresAt) return res.status(400).send("OTP expired");
    if (user.otpCode !== code) return res.status(400).send("Invalid OTP");

    user.isVerified = true;
    user.otpCode = null;
    user.otpExpiresAt = null;
    await user.save();

    res.send("Email verified successfully! You can now login.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// ---------------------- RESEND OTP ----------------------
exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ msg: "No user" });

    const code = randomOTP();
    const expiresAt = new Date(Date.now() + (Number(process.env.OTP_EXPIRES_MINUTES || 10) * 60 * 1000));

    user.otpCode = code;
    user.otpExpiresAt = expiresAt;
    await user.save();

    await sendOtpEmail({ email, code });

    res.json({ msg: "OTP resent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ---------------------- LOGIN ----------------------
exports.login = async (req, res) => {
  try {
    const { emailOrLogin, password } = req.body;
    const user = await User.findOne({ 
      where: { 
        [User.sequelize.Op.or]: [
          { email: emailOrLogin },
          { loginId: emailOrLogin }
        ]
      } 
    });

    if (!user || !await user.comparePassword(password)) 
      return res.status(400).json({ msg: "Invalid credentials" });

    if (!user.isVerified) 
      return res.status(403).json({ msg: "Email not verified" });

    const token = generateJwt(user);
    res.json({ token, user: { email: user.email, loginId: user.loginId } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ---------------------- GOOGLE LOGIN ----------------------
exports.googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ msg: "No idToken" });

    const ticket = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    const { sub: googleId, email } = payload;

    let user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({
        loginId: email,
        email,
        googleId,
        isVerified: true
      });
    }

    const token = generateJwt(user);
    res.json({ token, user: { email: user.email, loginId: user.loginId } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ---------------------- FORGOT PASSWORD ----------------------
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) 
      return res.status(200).json({ msg: "If that email exists, we sent a link" });

    const token = uuidv4();
    const expiresAt = new Date(Date.now() + (Number(process.env.RESET_TOKEN_EXPIRES_MINUTES || 30) * 60 * 1000));

    user.resetToken = token;
    user.resetTokenExpiresAt = expiresAt;
    await user.save();

    await sendMail({
      to: email,
      subject: 'Password Reset',
      html: `<p>Click here to reset your password: <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}">Reset Password</a></p>`
    });

    return res.status(200).json({ msg: "Reset link sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ---------------------- RESET PASSWORD ----------------------
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({ where: { resetToken: token } });

    if (!user || new Date() > user.resetTokenExpiresAt) 
      return res.status(400).json({ msg: "Invalid or expired token" });

    user.password = newPassword;
    user.resetToken = null;
    user.resetTokenExpiresAt = null;
    await user.save();

    res.json({ msg: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
