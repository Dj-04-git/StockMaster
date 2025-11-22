const StockMoveModel = require('../models/stockMoveModel');


async function listMoves(req, res) {
try {
const product_id = req.query.product_id ? Number(req.query.product_id) : null;
const moves = await StockMoveModel.listMoves(product_id);
res.json(moves);
} catch (err) {
res.status(500).json({ error: err.message });
}
}


async function getStock(req, res) {
try {
const product_id = Number(req.params.product_id);
const stock = await StockMoveModel.getStockForProduct(product_id);
res.json({ product_id, stock });
} catch (err) {
res.status(500).json({ error: err.message });
}
}


module.exports = { listMoves, getStock };