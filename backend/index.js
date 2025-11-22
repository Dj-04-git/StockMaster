<<<<<<< shreya/branch
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');  
const User = require('./models/User');  

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));

// Sync SQLite database and start server
sequelize.sync({ alter: true })   // creates tables if not exist & updates columns
  .then(() => {
    console.log("SQLite database & tables created!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("Failed to sync database:", err);
  });
=======
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth"));

app.listen(5000, () => console.log("Server running on port 5000"));
>>>>>>> main
