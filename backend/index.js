require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');


const app = express();
const PORT = process.env.PORT || 5000;


connectDB();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));


app.use('/api/auth', require('./routes/auth'));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));