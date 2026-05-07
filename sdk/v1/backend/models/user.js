const sqlite3 = require('sqlite3');
const console = require('node:console');

const config  = require("../lib/config.js");
const { connect_db } = require("../lib/database.js");
const db = connect_db(config.database.path);



// *crea la conexion a la base de datos
//-------------- BASE DE DATOS

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
    insertarUsuario
};