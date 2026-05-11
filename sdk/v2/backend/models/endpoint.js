const { getDatabaseConnection } = require('../lib/database.js');

const db = getDatabaseConnection();

function initializeEndpointTable() {

    const sql = `CREATE TABLE IF NOT EXISTS endpoint (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        path TEXT NOT NULL UNIQUE
    )    
    `

    db.run(sql, (err) => {
        if (err)
            throw new Error("Error creando table endpoint");

    })



}

function insertarEndpoint(path) {

    const sql = `INSERT INTO endpoint (path) VALUES (?)`

    return new Promise((resolve, reject) => {

        db.run(sql, [path], function (err) {
            if (err) {
                reject(err)
                return
            }

            const respuesta = {
                id: this.lastID,
                path: path
            }

            resolve(respuesta)
        })

    })
}


module.exports = {
    initializeEndpointTable,
    insertarEndpoint
}