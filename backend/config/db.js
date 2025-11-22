const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
  path.join(__dirname, "../db/stockmaster.db"),
  (err) => {
    if (err) console.error("SQLite Error:", err);
    else console.log("SQLite connected successfully");
  }
);

module.exports = db;
