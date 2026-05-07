const sqlite3 = require('sqlite3');
const console = require('node:console');



// *crea la conexion a la base de datos
//-------------- BASE DE DATOS


function connect_db(path) {

    const db = new sqlite3.Database(path, (err) => {
        if (err) {
            throw new Error(`Error al conectar a la base de datos: ${err.message}`);
        }
    });

    db.run(`
      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
      )
    `, (err) => {
        if (err) {
            console.error("Error creando tabla:", err.message);
        }
    });

    return db;
}


module.exports = {
    connect_db
};