const { getDb } = require('./db');


async function createDelivery({ contact_id }) {
const db = getDb();
const res = await db.run('INSERT INTO deliveries (contact_id, status) VALUES (?, ?)', [contact_id, 'Draft']);
return { id: res.lastID };
}


async function addDeliveryLine({ delivery_id, product_id, quantity }) {
const db = getDb();
const res = await db.run('INSERT INTO delivery_lines (delivery_id, product_id, quantity) VALUES (?, ?, ?)', [delivery_id, product_id, quantity]);
return { id: res.lastID };
}


async function getDeliveryLines(delivery_id) {
const db = getDb();
return db.all('SELECT * FROM delivery_lines WHERE delivery_id = ?', [delivery_id]);
}


async function setDeliveryStatus(delivery_id, status) {
const db = getDb();
await db.run('UPDATE deliveries SET status = ? WHERE id = ?', [status, delivery_id]);
}


module.exports = { createDelivery, addDeliveryLine, getDeliveryLines, setDeliveryStatus };