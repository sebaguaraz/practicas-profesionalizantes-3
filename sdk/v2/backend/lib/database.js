const sqlite3 = require('sqlite3');
const console = require('node:console');

const config  = require("../lib/config.js");
const path = config.database.path;

// *crea la conexion a la base de datos
//-------------- BASE DE DATOS


function getDatabaseConnection() {

    const db = new sqlite3.Database(path, (err) => {
        if (err) {
            throw new Error(`Error al conectar a la base de datos: ${err.message}`);
        }
    });

    return db;
}


module.exports = {
    getDatabaseConnection
};