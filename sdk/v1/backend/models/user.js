const sqlite3 = require('sqlite3');
const console = require('node:console');

const { getDatabaseConnection } = require("../lib/database.js");
const db = getDatabaseConnection();



// *crea la conexion a la base de datos
//-------------- BASE DE DATOS

function initializeUserTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL
        )
    `;

    db.run(sql, (err) => {
        if (err) {
            throw new Error(`Error creando tabla users: ${err.message}`);
        }
    });
}

function insertarUsuario(username, password) {

    const sql = `

    INSERT INTO user (username, password)
        VALUES (?, ?)
        `;

    return new Promise((resolve, reject) => {
        db.run(sql, [username, password], function (err) {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                id: this.lastID,
                username,
                password
            });
        });
    });
}



module.exports = {
    insertarUsuario,
    initializeUserTable
};