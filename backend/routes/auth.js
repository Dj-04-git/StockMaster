const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/authController');


// Signup (create user + send OTP)
router.post('/signup', ctrl.signup);
// Verify OTP
router.post('/verify-otp', ctrl.verifyOtp);
// Resend OTP
router.post('/resend-otp', ctrl.resendOtp);


// Login email/password
router.post('/login', ctrl.login);


// Google OAuth - simple flow: backend receives id_token from frontend OR full redirect flow
router.post('/google-login', ctrl.googleLogin);


// Forgot password - send reset link
router.post('/forgot-password', ctrl.forgotPassword);
// Reset password
router.post('/reset-password', ctrl.resetPassword);


module.exports = router;