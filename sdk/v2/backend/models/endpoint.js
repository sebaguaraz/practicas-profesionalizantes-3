const { db } = require('../lib/database.js');

function InitializeEndpointTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS endpoint (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      path TEXT NOT NULL UNIQUE
    )
  `;

    db.exec(sql);
}

function InsertEndpointDB(path) {
    const sql = `INSERT INTO endpoint (path) VALUES (?)`;
    const stmt = db.prepare(sql);

    const result = stmt.run(path);

    return {
        id: Number(result.lastInsertRowid),
        path: path
    };
}

function GetEndpointByIdDB(id) {
    const sql = `SELECT * FROM endpoint WHERE id = ?`;
    const stmt = db.prepare(sql);

    const result = stmt.get(id);

    return result || null;
}

module.exports = {
    InitializeEndpointTable,
    InsertEndpointDB,
    GetEndpointByIdDB
};