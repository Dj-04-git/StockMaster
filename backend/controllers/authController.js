const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { loginId, email, password } = req.body;

    if (!/^[A-Za-z0-9]{6,12}$/.test(loginId)) {
      return res.status(400).json({ msg: "Login ID must be 6-12 alphanumeric." });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }

    const existing = await User.findByEmailOrLoginId(email);
    if (existing) return res.status(400).json({ msg: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);

    await User.createUser(loginId, email, hash);

    res.json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { emailOrLogin, password } = req.body;

    const user = await User.findByEmailOrLoginId(emailOrLogin);

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      msg: "Login successful",
      token,
      user: {
        id: user.id,
        loginId: user.login_id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// GET ALL USERS
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (err) {
    console.error("GetUsers Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
