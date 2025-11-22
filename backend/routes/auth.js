const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/authController');

// Signup → create user in SQLite
router.post('/signup', ctrl.signup);
<<<<<<< shreya/branch
// Verify OTP
router.get('/verify-otp-link', ctrl.verifyOtpLink);
// Resend OTP
router.post('/resend-otp', ctrl.resendOtp);

=======
>>>>>>> main

// Login → email/loginId + password
router.post('/login', ctrl.login);

// Get all users (admin panel)
router.get('/users', ctrl.getUsers);

module.exports = router;
