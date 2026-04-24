const sqlite3 = require('sqlite3');
const { resolve } = require('node:path');
const console = require('node:console');

// *crea la conexion a la base de datos
//-------------- BASE DE DATOS


function connect_db(path) {
    const dbPath = resolve(path);

    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            throw new Error(`Error al conectar a la base de datos: ${err.message}`);
        }
    });

    return db;
}
function insertarUsuario(db, username, password) {
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
    connect_db,
    insertarUsuario
};