const { db } = require('../lib/database.js');

function InitializeMemberTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS members (
      id_user INTEGER NOT NULL,
      id_group INTEGER NOT NULL,
      PRIMARY KEY (id_user, id_group),
      FOREIGN KEY (id_user) REFERENCES user(id),
      FOREIGN KEY (id_group) REFERENCES "group"(id)
    )
  `;

    db.exec(sql);
}

function CreateMemberDB(id_group, id_user) {
    const sql = `INSERT INTO members (id_group, id_user) VALUES (?, ?)`;
    const stmt = db.prepare(sql);

    const result = stmt.run(id_group, id_user);

    return {
        id: Number(result.lastInsertRowid),
        id_group: id_group,
        id_user: id_user
    };
}

function UpdateMemberDB(id_user, old_id_group, new_id_group) {
    const sql = `UPDATE members SET id_group = ? WHERE id_user = ? AND id_group = ?`;
    const stmt = db.prepare(sql);

    const result = stmt.run(new_id_group, id_user, old_id_group);

    if (result.changes === 0) {
        return null;
    }

    return {
        id_user: id_user,
        old_id_group: old_id_group,
        new_id_group: new_id_group
    };
}

function GetMemberDB() {
    const sql = `SELECT id_user, id_group FROM members`;
    const stmt = db.prepare(sql);

    const result = stmt.all();

    if (result.length === 0) {
        return null;
    }

    return result;
}

function DeleteMemberDB(id_group, id_user) {
    const sql = `DELETE FROM members WHERE id_group = ? AND id_user = ?`;
    const stmt = db.prepare(sql);

    const result = stmt.run(id_group, id_user);

    if (result.changes === 0) {
        return null;
    }

    return {
        id_group: id_group,
        id_user: id_user
    };
}

module.exports = {
    InitializeMemberTable,
    CreateMemberDB,
    UpdateMemberDB,
    GetMemberDB,
    DeleteMemberDB
};