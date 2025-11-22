const { getDb } = require('./db');


async function createProduct({ name, initial_stock = 0 }) {
const db = getDb();
const res = await db.run(
'INSERT INTO products (name, initial_stock) VALUES (?, ?)',
[name, initial_stock]
);
return { id: res.lastID, name, initial_stock };
}


async function listProducts() {
const db = getDb();
return db.all('SELECT * FROM products');
}


async function getProduct(id) {
const db = getDb();
return db.get('SELECT * FROM products WHERE id = ?', [id]);
}


module.exports = { createProduct, listProducts, getProduct };