const dotenv = require("dotenv");
const mysql = require("mysql2/promise");

// ** carga las credenciales del archivo .env en un objeto process.env para poder acceder a ellas
dotenv.config();

// ** crea una conexion con la base de datos mediante las credenciales del usuario master para modificar la base de datos
const pool = mysql.createPool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.database
})

module.exports = pool;