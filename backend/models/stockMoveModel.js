const { getDb } = require('./db');


async function insertStockMove({ product_id, quantity, move_type, reference = null, source = null, destination = null }) {
const db = getDb();
const res = await db.run(
`INSERT INTO stock_moves (product_id, quantity, move_type, reference, source, destination)
VALUES (?, ?, ?, ?, ?, ?)`,
[product_id, quantity, move_type, reference, source, destination]
);
return { id: res.lastID };
}


async function getStockForProduct(product_id) {
const db = getDb();
const row = await db.get('SELECT COALESCE(SUM(quantity),0) as stock FROM stock_moves WHERE product_id = ?', [product_id]);
return row.stock;
}


async function listMoves(product_id) {
const db = getDb();
if (product_id) return db.all('SELECT * FROM stock_moves WHERE product_id = ? ORDER BY created_at ASC', [product_id]);
return db.all('SELECT * FROM stock_moves ORDER BY created_at ASC');
}


module.exports = { insertStockMove, getStockForProduct, listMoves };