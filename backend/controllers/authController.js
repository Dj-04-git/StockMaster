const User = require('../models/User');
const { generateJwt } = require('../utils.js/generateTokens.js');
const { sendMail } = require('../utils.js/email');
const { v4: uuidv4 } = require('uuid');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function randomOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
exports.verifyOtp = async (req, res) => {
const { email, code } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(400).json({ msg: 'No user' });
if (!user.otp || !user.otp.expiresAt) return res.status(400).json({ msg: 'No OTP present' });


if (new Date() > user.otp.expiresAt) return res.status(400).json({ msg: 'OTP expired' });
if (user.otp.code !== code) return res.status(400).json({ msg: 'Invalid OTP' });


user.isVerified = true;
user.otp = undefined;
await user.save();


const token = generateJwt(user);
res.json({ msg: 'Verified', token, user: { email: user.email, loginId: user.loginId } });
};


exports.resendOtp = async (req, res) => {
const { email } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(400).json({ msg: 'No user' });


const code = randomOTP();
const expiresAt = new Date(Date.now() + (Number(process.env.OTP_EXPIRES_MINUTES || 10) * 60 * 1000));
user.otp = { code, expiresAt };
await user.save();
await sendMail({ to: email, subject: 'Your new OTP', html: `<p>Your OTP is <b>${code}</b></p>` });
res.json({ msg: 'OTP resent' });
};


exports.login = async (req, res) => {
const { emailOrLogin, password } = req.body;
const user = await User.findOne({ $or: [{ email: emailOrLogin }, { loginId: emailOrLogin }] });
if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
if (!await user.comparePassword(password)) return res.status(400).json({ msg: 'Invalid credentials' });
if (!user.isVerified) return res.status(403).json({ msg: 'Email not verified' });


const token = generateJwt(user);
res.json({ token, user: { email: user.email, loginId: user.loginId } });
};


// Accept idToken from frontend and verify
exports.googleLogin = async (req, res) => {
const { idToken } = req.body;
if (!idToken) return res.status(400).json({ msg: 'No idToken' });


const ticket = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
const payload = ticket.getPayload();
const { sub: googleId, email, name } = payload;


let user = await User.findOne({ email });
if (!user) {
user = new User({ loginId: email, email, googleId, isVerified: true });
await user.save();
}


const token = generateJwt(user);
res.json({ token, user: { email: user.email, loginId: user.loginId } });
};


exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(200)
        .json({ msg: "If that email exists, we sent a link" });

    const token = uuidv4();
    const expiresAt = new Date(
      Date.now() +
        Number(process.env.RESET_TOKEN_EXPIRES_MINUTES || 30) * 60 * 1000
    );

    user.resetToken = { token, expiresAt };
    await user.save();

    await sendMail({
      to: email,
      subject: 'Password Reset',
      html: `<p>Click here to reset your password: <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}">Reset Password</a></p>`
    });

    return res.status(200).json({ msg: "Reset link sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

exports.signup = async (req, res) => {
  try {
    const { email, loginId, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already exists" });

    const code = randomOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const user = new User({
      email,
      loginId,
      password,
      otp: { code, expiresAt },
      isVerified: false
    });

    await user.save();

    await sendMail({
      to: email,
      subject: "Your OTP",
      html: `<p>Your OTP is <b>${code}</b></p>`
    });

    res.json({ msg: "OTP sent" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error creating user" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      "resetToken.token": token,
      "resetToken.expiresAt": { $gt: new Date() }
    });

    if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

    user.password = newPassword;
    user.resetToken = undefined;
    await user.save();

    res.json({ msg: "Password reset successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};
