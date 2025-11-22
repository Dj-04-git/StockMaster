const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products');
const receiptRoutes = require('./routes/receipts');
const deliveryRoutes = require('./routes/deliveries');
const stockMoveRoutes = require('./routes/stockMoves');
const { initDb } = require('./models/db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Initialize DB
initDb();
console.log("DB initialized");

// Routes
app.use('/products', productRoutes);
app.use('/receipts', receiptRoutes);   // <-- this is correct
app.use('/deliveries', deliveryRoutes);
app.use('/stock-moves', stockMoveRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
