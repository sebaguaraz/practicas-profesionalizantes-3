const { getDatabaseConnection } = require('../lib/database.js');

const db = getDatabaseConnection();

function initializeMemberTable() {

    const sql = `CREATE TABLE IF NOT EXISTS members (
        id_user INTEGER NOT NULL,
        id_group INTEGER NOT NULL,
        PRIMARY KEY (id_user, id_group),
        FOREIGN KEY (id_user) REFERENCES user(id),
        FOREIGN KEY (id_group) REFERENCES "group"(id)
        );
        `

    db.run(sql, (err) => {
        if (err)
            throw new Error("Error creando table members");

    })


}

function crearMiembro(id_group, id_user) {

    const sql = "INSERT INTO members (id_group, id_user) VALUES (?, ?)";

    return new Promise((resolve, reject) => {
        db.run(sql, [id_group, id_user], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({
                    id: this.lastID
                });
            }
        });
    });
}

function modificarMiembro(id_user, old_id_group, new_id_group) {


    const sql = "UPDATE members SET id_group = ? WHERE id_user = ? AND id_group = ?";

    return new Promise((resolve, reject) => {
        db.run(sql, [new_id_group, id_user, old_id_group], function (err) {
            if (err) {
                reject(err);
            } else if (this.changes === 0) {
                resolve(null)
            } else {
                resolve({
                    id: this.lastID
                });
            }
        });
    });
}



function obtenerMiembros() {

    const sql = "SELECT id_user, id_group FROM members";

    return new Promise((resolve, reject) => {
        db.all(sql, function (err, rows) {
            if (err) {
                reject(err);
            } else if (rows.length === 0) {

                resolve(null)

            } else {
                resolve(rows);
            }
        });
    });
}


function eliminarMiembro(id_group, id_user) {

    const sql = "DELETE FROM members WHERE id_group = ? AND id_user = ?";

    return new Promise((resolve, reject) => {

        db.run(sql, [id_group, id_user], function (err) {

            if (err) {
                reject(err);

            } else if (this.changes === 0) {
                resolve(null)
            } else {
                
                resolve({
                    id: this.lastID
                });
            }
        });
    });
}

module.exports = {
    initializeMemberTable,
    crearMiembro,
    modificarMiembro,
    obtenerMiembros,
    eliminarMiembro
}