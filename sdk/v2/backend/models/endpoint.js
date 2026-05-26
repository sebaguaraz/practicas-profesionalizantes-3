const { getDatabaseConnection } = require('../lib/database.js');

const db = getDatabaseConnection();

function InitializeEndpointTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS endpoint (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      path TEXT NOT NULL UNIQUE
    )
  `;

    db.run(sql, (err) => {
        if (err) {
            throw new Error("Error creando table endpoint");
        }
    });
}

function InsertEndpointDB(path) {
    const sql = `INSERT INTO endpoint (path) VALUES (?)`;

    return new Promise((resolve, reject) => {
        db.run(sql, [path], function (err) {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                id: this.lastID,
                path
            });
        });
    });
}

function GetEndpointByIdDB(id) {
    const sql = `SELECT * FROM endpoint WHERE id = ?`;

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

module.exports = {
    InitializeEndpointTable,
    InsertEndpointDB,
    GetEndpointByIdDB
};