const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/authController');

// Signup → create user in SQLite
router.post('/signup', ctrl.signup);

// Login → email/loginId + password
router.post('/login', ctrl.login);

// Get all users (admin panel)
router.get('/users', ctrl.getUsers);

module.exports = router;
