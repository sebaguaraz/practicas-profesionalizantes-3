const { db } = require("../lib/database.js");

function InitializeUserTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `;

  db.exec(sql);
}

function InsertUserDB(username, password) {
  const sql = `
    INSERT INTO user (username, password)
    VALUES (?, ?)
  `;
  const stmt = db.prepare(sql);

  const result = stmt.run(username, password);

  return {
    id: Number(result.lastInsertRowid),
    username: username
  };
}

function GetUserByNameDB(username) {
  const sql = `
    SELECT * FROM user WHERE username = ?
  `;
  const stmt = db.prepare(sql);

  const result = stmt.get(username);

  return result || null;
}

function GetUserByIdDB(id) {
  const sql = `SELECT * FROM user WHERE id = ?`;
  const stmt = db.prepare(sql);

  const result = stmt.get(id);

  return result || null;
}

function UpdateUserDB(id_user, password) {
  const sql = `UPDATE user SET password = ? WHERE id = ?`;
  const stmt = db.prepare(sql);

  const result = stmt.run(password, id_user);

  if (result.changes === 0) {
    return null;
  }

  return {
    id: id_user
  };
}

function DeleteUserDB(id) {
  const sql = `DELETE FROM user WHERE id = ?`;
  const stmt = db.prepare(sql);

  const result = stmt.run(id);

  if (result.changes === 0) {
    return null;
  }

  return {
    id: id
  };
}

function GetUsersAllDB() {
  const sql = `SELECT id, username FROM user`;
  const stmt = db.prepare(sql);

  const result = stmt.all();

  if (result.length === 0) {
    return null;
  }

  return result;
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