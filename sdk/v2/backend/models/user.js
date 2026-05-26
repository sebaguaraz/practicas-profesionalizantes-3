const { getDatabaseConnection } = require("../lib/database.js");
const db = getDatabaseConnection();

function InitializeUserTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `;

  db.run(sql, (err) => {
    if (err) {
      throw new Error(`Error creando tabla users: ${err.message}`);
    }
  });
}

function InsertUserDB(username, password) {
  const sql = `
    INSERT INTO user (username, password)
    VALUES (?, ?)
  `;

  return new Promise((resolve, reject) => {
    db.run(sql, [username, password], function (err) {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        id: this.lastID,
        username,
        password
      });
    });
  });
}

function GetUserByNameDB(username) {
  const sql = `
    SELECT * FROM user WHERE username = ?
  `;

  return new Promise((resolve, reject) => {
    db.get(sql, [username], function (err, row) {
      if (err) {
        reject(err);
        return;
      }

      resolve(row);
    });
  });
}

function GetUserByIdDB(id) {
  const sql = `SELECT * FROM user WHERE id = ?`;

  return new Promise((resolve, reject) => {
    db.get(sql, [id], function (err, row) {
      if (err) {
        reject(err);
        return;
      }

      resolve(row || null);
    });
  });
}

function UpdateUserDB(id_user, password) {
  const sql = `UPDATE user SET password = ? WHERE id = ?`;

  return new Promise((resolve, reject) => {
    db.run(sql, [password, id_user], function (err) {
      if (err) {
        reject(err);
        return;
      }

      if (this.changes === 0) {
        resolve(null);
      } else {
        resolve({ id: id_user });
      }
    });
  });
}

function DeleteUserDB(id) {
  const sql = `DELETE FROM user WHERE id = ?`;

  return new Promise((resolve, reject) => {
    db.run(sql, [id], function (err) {
      if (err) {
        reject(err);
        return;
      }

      if (this.changes === 0) {
        resolve(null);
      } else {
        resolve({ id });
      }
    });
  });
}

function GetUsersAllDB() {
  const sql = `SELECT id, username FROM user`;

  return new Promise((resolve, reject) => {
    db.all(sql, function (err, rows) {
      if (err) {
        reject(err);
        return;
      }

      resolve(rows.length === 0 ? null : rows);
    });
  });
}

module.exports = {
  InitializeUserTable,
  InsertUserDB,
  GetUserByNameDB,
  GetUserByIdDB,
  GetUsersAllDB,
  UpdateUserDB,
  DeleteUserDB
};