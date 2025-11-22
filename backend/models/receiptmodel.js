const { getDb } = require('./db');


async function createReceipt({ contact_id }) {
  const db = getDb();

  const stmt = await db.run(
    "INSERT INTO receipts (contact_id, status) VALUES (?, ?)",
    [contact_id, "Draft"]
  );

  console.log("INSERT RECEIPT stmt:", stmt);
  console.log("RECEIPT INSERT ID:", stmt.lastID);

  return { id: stmt.lastID };
}


async function addReceiptLine({ receipt_id, product_id, quantity }) {
const db = getDb();
const res = await db.run('INSERT INTO receipt_lines (receipt_id, product_id, quantity) VALUES (?, ?, ?)', [receipt_id, product_id, quantity]);
return { id: res.lastID };
}


async function getReceiptLines(receipt_id) {
const db = getDb();
return db.all('SELECT * FROM receipt_lines WHERE receipt_id = ?', [receipt_id]);
}


async function setReceiptStatus(receipt_id, status) {
const db = getDb();
await db.run('UPDATE receipts SET status = ? WHERE id = ?', [status, receipt_id]);
}


module.exports = { createReceipt, addReceiptLine, getReceiptLines, setReceiptStatus };