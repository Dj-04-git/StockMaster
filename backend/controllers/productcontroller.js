const ProductModel = require('../models/productModel');
const StockMoveModel = require('../models/stockMoveModel');


async function createProduct(req, res) {
try {
const { name, initial_stock } = req.body;
const product = await ProductModel.createProduct({ name, initial_stock });


// if initial_stock > 0, create a stock move
if (initial_stock && initial_stock > 0) {
await StockMoveModel.insertStockMove({
product_id: product.id,
quantity: initial_stock,
move_type: 'IN',
reference: `INIT/${product.id}`,
source: 'Init',
destination: 'Warehouse'
});
}


res.status(201).json(product);
} catch (err) {
console.error(err);
res.status(500).json({ error: err.message });
}
}


async function listProducts(req, res) {
try {
const products = await ProductModel.listProducts();
// append live stock
const withStock = await Promise.all(products.map(async p => {
const stock = await StockMoveModel.getStockForProduct(p.id);
return { ...p, stock };
}));


res.json(withStock);
} catch (err) {
res.status(500).json({ error: err.message });
}
}


module.exports = { createProduct, listProducts };