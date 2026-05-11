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
            username TEXT NOT NULL UNIQUE,
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

function obtenerUsuarioPorNombre(username) {

    const sql = `

    SELECT * FROM user WHERE username = ?
        `;

    return new Promise((resolve, reject) => {
        db.get(sql, [username], function (err, row) {
            if (err) {
                reject(err);
                return;
            }

            resolve(row);
        });
    });
}

function getUserById(id) {

    const sql = `SELECT * FROM user WHERE id = ?`;

    return new Promise((resolve, reject) => {
        db.get(sql, [id], function (err, row) {
            if (err) {
                reject(err)
                return
            }

            if (!row) {
                resolve(null)
                return
            }

            resolve(row)


        })
    })

}


function updateUser(id_user, password) {

    const sql = `UPDATE user SET password = ? WHERE id = ?`;

    return new Promise((resolve, reject) => {
        db.run(sql, [password, id_user], function (err) {
            if (err) {
                // si hay error entra al catch del service porque en el await hace throw new error
                reject(err)
                return
            }

            // * this.changes indica cuantas filas se actualizaron
            if (this.changes === 0) {
                resolve(null)
            } else {

                resolve({ id: id_user })

            }
        })
    })


}


function deleteUser(id) {

    const sql = `DELETE FROM user WHERE id = ?`;

    return new Promise((resolve, reject) => {

        db.run(sql, [id], function (err) {

            if (err) {
                reject(err)
                return
            }

            if (this.changes === 0) {
                resolve(null)
            } else {
                resolve({ id: id })
            }

        })


    })


}


function getUsersAll() {

    const sql = `SELECT id, username FROM user`;

    return new Promise((resolve, reject) => {
        db.all(sql, function (err, rows) {
            if (err) {
                reject(err)
                return
            }
            if (rows.length === 0) {
                resolve(null)
            } else {
                resolve(rows)
            }
        })
    })


}

module.exports = {
    initializeUserTable,
    insertarUsuario,
    obtenerUsuarioPorNombre,
    getUserById,
    getUsersAll,
    updateUser,
    deleteUser,


};