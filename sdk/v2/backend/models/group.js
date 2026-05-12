const { getDatabaseConnection } = require('../lib/database.js');

const db = getDatabaseConnection();

function initializeGroupTable() {

    const sql = `CREATE TABLE IF NOT EXISTS "group" (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
    )    
    `


    db.run(sql, (err) => {
        if (err)
            throw new Error("Error creando table group");

    })



}


function insertarGrupo(name) {


    const sql = `INSERT INTO "group" (name) VALUES (?)`

    return new Promise((resolve, reject) => {

        db.run(sql, [name], function (err) {
            if (err) {
                reject(err)
                return
            }

            const respuesta = {
                id: this.lastID,
                name: name
            }

            resolve(respuesta)
        })

    })

}

function obtenerGrupos() {

    const sql = `SELECT * FROM "group" `

    return new Promise(function (resolve, reject) {
        db.all(sql, function (err, rows) {
            if (err) {
                reject(err)
                return
            }
            else if (rows.length === 0) {
                resolve(null)
            } else {
                resolve(rows)
            }

        })
    })
}

function getGroupById(new_id_group) {

    const sql = `SELECT * FROM "group" WHERE id = ? `

    return new Promise((resolve, reject) => {
        db.get(sql, [new_id_group], function (err, row) {
            if (err) {
                reject(err)
                return
            } else if (!row) {
                resolve(null)
                return
            }
            resolve(row)
        })
    })

}



function modificarGrupo(id, name) {

    const sql = `UPDATE "group" SET name = ? WHERE id = ?`

    return new Promise(function (resolve, reject) {
        db.run(sql, [name, id], function (err, row) {
            if (err) {
                reject(err)
                return
            } else if (this.changes === 0) {
                resolve(null)
            } else {
                resolve({ id: id, name: name })
            }
        })
    })


}

async function eliminarGrupo(id_group) {

    const sql = `DELETE FROM "group" WHERE id = ? `
    return new Promise(function (resolve, reject) {
        db.run(sql, [id_group], function (err) {
            if (err) {
                reject(err)
            } else if (this.changes === 0) {
                resolve(null)
            } else {
                resolve({ id: id_group })
            }

        })
    })

}



module.exports = { initializeGroupTable, insertarGrupo, modificarGrupo, obtenerGrupos, eliminarGrupo, getGroupById }