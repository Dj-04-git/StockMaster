const express = require('express');
const router = express.Router();
const StockMoveModel = require('../models/stockMoveModel');
const StockMoveController = require('../controllers/stockmovecontroller');

// CREATE STOCK MOVE (manual insert)
router.post('/', async (req, res) => {
  try {
    const data = await StockMoveModel.insertStockMove(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LIST ALL MOVES OR FILTER BY PRODUCT
router.get('/', StockMoveController.listMoves);

// GET STOCK FOR A PRODUCT
router.get('/stock/:product_id', StockMoveController.getStock);

module.exports = router;
