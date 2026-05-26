const sqlite3 = require('sqlite3');
const { resolve } = require('node:path');
const config = require('./config.js');

const dbPath = resolve(__dirname, "..", config.database.path);

function getDatabaseConnection() {
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            throw new Error(`Error al conectar a la base de datos: ${err.message}`);
        }
    });

    return db;
}

module.exports = {
    getDatabaseConnection
};