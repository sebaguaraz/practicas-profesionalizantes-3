const { db } = require('../lib/database.js');

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

    db.exec(sql);
}

function CreateAccessDB(id_group, id_endpoint) {
    const sql = `INSERT INTO access (id_group, id_endpoint) VALUES (?, ?)`;
    const stmt = db.prepare(sql);

    const result = stmt.run(id_group, id_endpoint);

    return {
        id: Number(result.lastInsertRowid)
    };
}

function UpdateAccessDB(id_group, id_endpoint_old, id_endpoint_new) {
    const sql = `UPDATE access SET id_endpoint = ? WHERE id_group = ? AND id_endpoint = ?`;
    const stmt = db.prepare(sql);

    const result = stmt.run(id_endpoint_new, id_group, id_endpoint_old);

    if (result.changes === 0) {
        return null;
    }

    return {
        id_group: id_group,
        id_endpoint_old: id_endpoint_old,
        id_endpoint_new: id_endpoint_new
    };
}

function GetAccessDB() {
    const sql = `SELECT id_group, id_endpoint FROM access`;
    const stmt = db.prepare(sql);

    const result = stmt.all();

    if (result.length === 0) {
        return null;
    }

    return result;
}

function DeleteAccessDB(id_group, id_endpoint) {
    const sql = `DELETE FROM access WHERE id_group = ? AND id_endpoint = ?`;
    const stmt = db.prepare(sql);

    const result = stmt.run(id_group, id_endpoint);

    if (result.changes === 0) {
        return null;
    }

    return {
        message: "Acceso eliminado"
    };
}

module.exports = {
    InitializeAccessTable,
    CreateAccessDB,
    UpdateAccessDB,
    GetAccessDB,
    DeleteAccessDB
};