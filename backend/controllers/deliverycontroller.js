const DeliveryModel = require('../models/deliveryModel');
const StockMoveModel = require('../models/stockMoveModel');


async function createDelivery(req, res) {
try {
const { contact_id, lines } = req.body; // lines: [{product_id, quantity}]
const { id } = await DeliveryModel.createDelivery({ contact_id });
for (const l of lines || []) {
await DeliveryModel.addDeliveryLine({ delivery_id: id, product_id: l.product_id, quantity: l.quantity });
}
res.status(201).json({ id });
} catch (err) {
res.status(500).json({ error: err.message });
}
}


async function validateDelivery(req, res) {
try {
const deliveryId = req.params.id;
const lines = await DeliveryModel.getDeliveryLines(deliveryId);


// check availability
for (const line of lines) {
const stock = await StockMoveModel.getStockForProduct(line.product_id);
if (stock < line.quantity) return res.status(400).json({ error: 'Insufficient stock', product_id: line.product_id });
}


// create out moves
for (const line of lines) {
await StockMoveModel.insertStockMove({
product_id: line.product_id,
quantity: -Math.abs(line.quantity),
move_type: 'OUT',
reference: `WH/OUT/${deliveryId}`,
source: 'Warehouse',
destination: 'Customer'
});
}


await DeliveryModel.setDeliveryStatus(deliveryId, 'Done');
res.json({ success: true });
} catch (err) {
res.status(500).json({ error: err.message });
}
}


module.exports = { createDelivery, validateDelivery };