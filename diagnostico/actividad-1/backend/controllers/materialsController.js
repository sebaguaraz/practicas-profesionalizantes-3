// importa la conexion a la db con el usuario para acceder a la base de datos
const materialsDB = require("../repositories/materialsDB");

const materialsController = {
    getmaterials: async (req, res) => {

        try {

            const results = await materialsDB.getmaterials();

            // utilizas el objeto res e invocas a json() pasandole como parametro "algo" (tu respuesta q es un objeto) y lo convierte la respuesta en una cadena de texto JSON
            res.json(results);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }

    },

    getmaterialByname: async (name) => {

        const results = await materialsDB.getmaterialByname(name);
        return results;

    },

    creatematerials: async (req, res) => {

        const units_declared = ["kg", "m^3", "unidad"]

        const { name, stock, price, units } = req.body;
        const state = 1;



        if (stock < 0 || !units_declared.includes(units)) {
            res.status(400).json({ error: "Error, el stock del material es negativo o el monto no es correspondiente." });

            return;

        }

        try {
            const material = await materialsDB.getmaterialByname(name);
            if (material.length > 0) {
                res.status(400).json({ message: "el material ya existe." });
                return;
            }

            
            const result = await materialsDB.creatematerials(name, stock, price, units, state);
            res.json(result);

        } catch (err) {
            res.status(500).json({ error: err.message });
            console.log(err)
        }
    },


    updatematerials: async (req, res) => {
        const { stock, price } = req.body;
        const id = req.params.idMaterial;

        try {
            if (!stock || !price) {
                res.status(400).json({ message: "Faltan campos requeridos: stock, price" });
                return;
            }
            
            if (stock <= 0 || price <= 0) {
                res.status(400).json({ message: "La operacion no se pudo realizar. Precio y Stock deben ser mayor a 0 " });
                return;
            }

            const result = await materialsDB.updatematerials(stock, price,id);

            res.json(result);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }


    },

    getStockFromMaterial: async (id) => {
        const result = await materialsDB.getStockFromMaterial(id);
        return result;

    },


    buymaterials: async (req, res) => {
        const { stock } = req.body;
        const id = req.params.idMaterial;
        try {
            if (stock < 0 || isNaN(stock) || !stock) {
                res.status(400).json({ message: "El stock debe ser mayor a 0 y ser un numero entero" });
                return;
            }

            const verifyStock = await materialsDB.getStockFromMaterial(id); // * devuelve un [1,2,3,...] con elementos
            if (!verifyStock || verifyStock.length === 0) {
                res.status(400).json({ message: "Material no encontrado" });
                return;
            }

            const currentStock = verifyStock[0].stock; // * accedo a la propiedad de ese elemento en la pos 0 del array 
            if (currentStock < stock) {
                res.status(400).json({ message: "No hay suficiente stock disponible. Stock actual: " + currentStock });
                return;
            }

            const result = await materialsDB.buymaterials(stock, id);
            res.json(result);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    }



}

module.exports = materialsController;