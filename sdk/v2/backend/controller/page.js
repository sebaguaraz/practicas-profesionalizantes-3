const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');

const config = require("../lib/config.js");

//* -------------- HANDLER / CONTROLLER


function Default(request, response) {
    try {
        const htmlPath = resolve(config.server.default_path);
        const html = readFileSync(htmlPath, 'utf-8');

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(html);
    } catch (error) {
        console.log(error.message);
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('Error interno: No se pudo cargar la vista principal.');
    }
}


module.exports = {Default};