const { getDatabaseConnection } = require('../lib/database.js');

const db = getDatabaseConnection();

function initializeAccessTable() {

    const sql = `CREATE TABLE IF NOT EXISTS access (
    id_group INTEGER NOT NULL,
    id_endpoint INTEGER NOT NULL,
    PRIMARY KEY (id_group, id_endpoint),
    FOREIGN KEY (id_group) REFERENCES "group"(id),
    FOREIGN KEY (id_endpoint) REFERENCES endpoint(id)
    );    
    `

    db.run(sql, (err) => {
        if (err)
            throw new Error("Error creando table access");

    })

}

function crearAcceso(id_group, id_endpoint) {

    const sql = `INSERT INTO access (id_group, id_endpoint) VALUES (?, ?)`

    return new Promise((resolve, reject) => {
        db.run(sql, [id_group, id_endpoint], function (err) {
            if (err) {
                reject(err)
                return
            } else {
                resolve({ id: this.lastID })
            }
        })
    })
}

function modificarAcceso(id_group, id_endpoint_old, id_endpoint_new) {

    const sql = `UPDATE access SET id_endpoint = ? WHERE id_group = ? AND id_endpoint = ? `

    return new Promise((resolve, reject) => {
        db.run(sql, [id_endpoint_new, id_group, id_endpoint_old], function (err) {
            if (err) {
                reject(err)
                return
            } else if (this.changes === 0) {
                resolve(null)
            } else {
                resolve({
                    id: this.lastID
                })
            }
        })
    })


}


function obtenerAccesos() {

    const sql = `SELECT id_group, id_endpoint FROM access `

    return new Promise((resolve, reject) => {
        db.all(sql, function (err, rows) {
            if (err) {
                reject(err)
                return
            } else if (rows.length === 0) {
                resolve(null)
            } else {
                resolve(rows)
            }
        })
    })


}

function eliminarAcceso(id_group, id_endpoint) {

    const sql = `DELETE FROM access WHERE id_group = ? AND id_endpoint = ? `

    return new Promise((resolve, reject) => {
        db.run(sql, [id_group, id_endpoint], function (err) {
            if (err) {
                // * si ocurre reject, hace return throw new Error() en la funcion de arriba
                reject(err)
                return
            } else if (this.changes === 0) {
                resolve(null)
            } else {
                resolve({ message: "Acceso eliminado" })
            }
        })
    })


}


module.exports = { initializeAccessTable, crearAcceso, modificarAcceso, obtenerAccesos, eliminarAcceso }