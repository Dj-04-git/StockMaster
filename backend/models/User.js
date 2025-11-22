const db = require("../config/db");
const bcrypt = require("bcryptjs");

module.exports = {
  createUser: (loginId, email, passwordHash) => {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO Users (login_id, email, password_hash)
        VALUES (?, ?, ?)
      `;
      db.run(sql, [loginId, email, passwordHash], function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      });
    });
  },

  findByEmailOrLoginId: (emailOrLoginId) => {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM Users WHERE email = ? OR login_id = ?`,
        [emailOrLoginId, emailOrLoginId],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  },

  findAll: () => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT id, login_id, email, role FROM Users`, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
};
