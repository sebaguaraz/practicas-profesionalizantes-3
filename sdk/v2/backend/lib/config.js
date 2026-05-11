const { readFileSync } = require('node:fs');
const console = require('node:console');



    function load_config() {
        try {
            const data = readFileSync("./config/config.json", "utf8");

            const config = JSON.parse(data);
            console.log("Configuración cargada correctamente.");
            return config;
            
        }
        catch (error) {

            throw new Error("Error cargando config.json.");
        }
    }

    const config = load_config();

module.exports = config; 
