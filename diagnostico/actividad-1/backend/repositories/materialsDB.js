const pool = require("../../db");

const materialsDB = {
    getmaterials: async () => {

        const query = `SELECT * FROM fabrica_stock`;
        try {
            // pool devuelve un array q tiene 2 array dentro [ [fila1, fila2], [datos_técnicos] ] y yo accedo al primer array luego al validar me fijo si ese primer array tiene elementos o no para entrar al if
            const results = await pool.query(query);

            return results[0];
        } catch (err) {
            return { error: err.message };
        }

    },

    getmaterialByname: async (name) => {
        const query = `SELECT * FROM fabrica_stock WHERE name = ?`;

        // pool devuelve un array q tiene 2 array dentro [ [fila1, fila2], [datos_técnicos] ] y yo accedo al primer array luego al validar me fijo si ese primer array tiene elementos o no para entrar al if
        const results = await pool.query(query, [name]);
        return results[0] || null;

    },

    creatematerials: async (name, stock, price, units, state) => {

        try {
            const query = `INSERT INTO fabrica_stock (name, stock, price, units, state) VALUES (?,?,?,?,?) `;
            const result = await pool.query(query, [name, stock, price, units, state]);
            return { message: "Material creado exitosamente", materialId: result.insertId };

        } catch (err) {
            return { error: err.message };
        }
    },


    updatematerials: async (stock, price,id) => {

        try {
            
            const query = `UPDATE fabrica_stock SET stock = stock + ?, price = ? WHERE id = ?`;

            // pool en UPDATE devuelve un array q tiene 2 array dentro [ [fila1, fila2], [datos_técnicos] ]. Nos interesa el primer array. En
            // object.affectedRows: numero de filas modificadas "si es mayor a 1"
            const rows = await pool.query(query, [stock,price , id]);

            const result = rows[0].affectedRows > 0 ? { message: "Material actualizado exitosamente" } : { message: "No se realizo actualizacion" };
            return result;

        } catch (err) {
            return { message: err.message };
        }


    },

    getStockFromMaterial: async (id) => {
        // SELECT devuelve un array q tiene 2 array dentro [ [fila1, fila2], [datos_técnicos] ], el primero es el q nos interesa. Los datos o un array vacio
        const query = `SELECT stock FROM fabrica_stock WHERE id = ?`;
        const rows = await pool.query(query, [id]);
        console.log(rows[0])
        return rows[0];

    },


    buymaterials: async (stock,id) => {
        
        try {
            
            // pool en UPDATE devuelve un array q tiene 2 array dentro [ [fila1, fila2], [datos_técnicos] ]. Nos interesa el primer array. En
            // object.affectedRows: numero de filas modificadas "si es mayor a 1"
            const query = `UPDATE fabrica_stock SET stock = stock - ? WHERE id = ?`;
            const rows = await pool.query(query, [stock, id])

            const result = rows[0].affectedRows > 0 ? { message: "Se reducio el stock del material" } : { message: "No se realizaron modificaciones" };
            return result;

        } catch (error) {
            return { message: error.message };
        }

    }



}



module.exports = materialsDB;