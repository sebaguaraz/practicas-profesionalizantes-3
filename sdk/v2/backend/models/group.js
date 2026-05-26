const { getDatabaseConnection } = require('../lib/database.js');

const db = getDatabaseConnection();

function InitializeGroupTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS "group" (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )
  `;

    db.run(sql, (err) => {
        if (err) {
            throw new Error("Error creando table group");
        }
    });
}

function insertGroupDB(name) {
    const sql = `INSERT INTO "group" (name) VALUES (?)`;

    return new Promise((resolve, reject) => {
        db.run(sql, [name], function (err) {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                id: this.lastID,
                name
            });
        });
    });
}

function GetGroupDB() {
    const sql = `SELECT * FROM "group"`;

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

function GetGroupByIdDB(new_id_group) {
    const sql = `SELECT * FROM "group" WHERE id = ?`;

    return new Promise((resolve, reject) => {
        db.get(sql, [new_id_group], function (err, row) {
            if (err) {
                reject(err);
                return;
            }

            resolve(row || null);
        });
    });
}

function UpdateGroupDB(id, name) {
    const sql = `UPDATE "group" SET name = ? WHERE id = ?`;

    return new Promise((resolve, reject) => {
        db.run(sql, [name, id], function (err) {
            if (err) {
                reject(err);
                return;
            }

            if (this.changes === 0) {
                resolve(null);
            } else {
                resolve({ id, name });
            }
        });
    });
}

function DeleteGroupDB(id_group) {
    const sql = `DELETE FROM "group" WHERE id = ?`;

    return new Promise((resolve, reject) => {
        db.run(sql, [id_group], function (err) {
            if (err) {
                reject(err);
                return;
            }

            if (this.changes === 0) {
                resolve(null);
            } else {
                resolve({ id: id_group });
            }
        });
    });
}

module.exports = {
    InitializeGroupTable,
    insertGroupDB,
    UpdateGroupDB,
    GetGroupDB,
    DeleteGroupDB,
    GetGroupByIdDB
};