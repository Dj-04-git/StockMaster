const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

let db;

async function initDb() {
  const dbFile = path.join(__dirname, "..", "data", "warehouse.db");

  db = await open({
    filename: dbFile,
    driver: sqlite3.Database
  });

  console.log("SQLite connected using sqlite + sqlite3");

  await db.exec("PRAGMA foreign_keys = ON");

  await db.exec(`
    CREATE TABLE IF NOT EXISTS receipts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contact_id INTEGER,
      status TEXT DEFAULT 'Draft',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS receipt_lines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      receipt_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      FOREIGN KEY(receipt_id) REFERENCES receipts(id),
      FOREIGN KEY(product_id) REFERENCES products(id)
    );
  `);

  return db;
}

function getDb() {
  if (!db) throw new Error("DB not initialized");
  return db;
}

module.exports = { initDb, getDb };
