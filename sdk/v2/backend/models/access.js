const { getDatabaseConnection } = require('../lib/database.js');

const db = getDatabaseConnection();

function InitializeAccessTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS access (
      id_group INTEGER NOT NULL,
      id_endpoint INTEGER NOT NULL,
      PRIMARY KEY (id_group, id_endpoint),
      FOREIGN KEY (id_group) REFERENCES "group"(id),
      FOREIGN KEY (id_endpoint) REFERENCES endpoint(id)
    )
  `;

    db.run(sql, (err) => {
        if (err) {
            throw new Error("Error creando table access");
        }
    });
}

function CreateAccessDB(id_group, id_endpoint) {
    const sql = `INSERT INTO access (id_group, id_endpoint) VALUES (?, ?)`;

    return new Promise((resolve, reject) => {
        db.run(sql, [id_group, id_endpoint], function (err) {
            if (err) {
                reject(err);
                return;
            }

            resolve({ id: this.lastID });
        });
    });
}

function UpdateAccessDB(id_group, id_endpoint_old, id_endpoint_new) {
    const sql = `UPDATE access SET id_endpoint = ? WHERE id_group = ? AND id_endpoint = ?`;

    return new Promise((resolve, reject) => {
        db.run(sql, [id_endpoint_new, id_group, id_endpoint_old], function (err) {
            if (err) {
                reject(err);
                return;
            }

            if (this.changes === 0) {
                resolve(null);
            } else {
                resolve({
                    id: this.lastID
                });
            }
        });
    });
}

function GetAccessDB() {
    const sql = `SELECT id_group, id_endpoint FROM access`;

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

function DeleteAccessDB(id_group, id_endpoint) {
    const sql = `DELETE FROM access WHERE id_group = ? AND id_endpoint = ?`;

    return new Promise((resolve, reject) => {
        db.run(sql, [id_group, id_endpoint], function (err) {
            if (err) {
                reject(err);
                return;
            }

            if (this.changes === 0) {
                resolve(null);
            } else {
                resolve({ message: "Acceso eliminado" });
            }
        });
    });
}

module.exports = {
    InitializeAccessTable,
    CreateAccessDB,
    UpdateAccessDB,
    GetAccessDB,
    DeleteAccessDB
};