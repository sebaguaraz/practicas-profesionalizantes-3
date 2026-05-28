const { db } = require('../lib/database.js');

function InitializeGroupTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS "group" (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )
  `;

    db.exec(sql);
}

function insertGroupDB(name) {
    const sql = `INSERT INTO "group" (name) VALUES (?)`;
    const stmt = db.prepare(sql);

    const result = stmt.run(name);

    return {
        id: Number(result.lastInsertRowid),
        name: name
    };
}

function GetGroupDB() {
    const sql = `SELECT * FROM "group"`;
    const stmt = db.prepare(sql);

    const result = stmt.all();

    if (result.length === 0) {
        return null;
    }

    return result;
}

function GetGroupByIdDB(new_id_group) {
    const sql = `SELECT * FROM "group" WHERE id = ?`;
    const stmt = db.prepare(sql);

    const result = stmt.get(new_id_group);

    if (!result) {
        return null;
    }

    return result;
}

function UpdateGroupDB(id, name) {
    const sql = `UPDATE "group" SET name = ? WHERE id = ?`;
    const stmt = db.prepare(sql);

    const result = stmt.run(name, id);

    if (result.changes === 0) {
        return null;
    }

    return {
        id: id,
        name: name
    };
}

function DeleteGroupDB(id_group) {
    const sql = `DELETE FROM "group" WHERE id = ?`;
    const stmt = db.prepare(sql);

    const result = stmt.run(id_group);

    if (result.changes === 0) {
        return null;
    }

    return {
        id: id_group
    };
}

module.exports = {
    InitializeGroupTable,
    insertGroupDB,
    UpdateGroupDB,
    GetGroupDB,
    DeleteGroupDB,
    GetGroupByIdDB
};