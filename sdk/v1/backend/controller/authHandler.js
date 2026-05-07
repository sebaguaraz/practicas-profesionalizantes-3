const { URL } = require('node:url');
const console = require('node:console');
const { readFileSync } = require('node:fs');
const register = require("../services/registerService.js");
const login = require("../services/loginService.js");

const config = require("../lib/config.js");


//* -------------- HANDLER / CONTROLLER

async function login_handler(request, response) {
    const url = new URL(request.url, 'http://' + config.server.ip);
    // * OBTENGO los datos de la URL
    const input = Object.fromEntries(url.searchParams);

    // * se los paso a la funcion LOGICA DE NEGOCIOS
    const output = login(input);

    // *creo una respuesta en base a lo que me devolvio la funcion LOGICA DE NEGOCIOS
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(output));
}


function register_handler(request, response) {

    // * si el metodo de la peticion es POST accede a los datos de una forma diferente
    if (request.method == "POST") {

        let bodyComplete = "";

        // * obtengo los datos del body
        request.on("data", (paquete) => {
            bodyComplete += paquete.toString();
        })

        request.on("end", async () => {
            const params = new URLSearchParams(bodyComplete);


            const objetoResultante = Object.fromEntries(params);
            console.log(objetoResultante)
            try {

                // *se los paso al metodo de LOGICA DE NEGOCIOS
                const output = await register(objetoResultante);

                // * creo una RESPUESTA en base a lo que me devolvio la DB
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(output));
            } catch (error) {
                return { error: error.message }
            }
        })

    } else if (request.method == "GET") {

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end('Metodo no soportado');

    }



}


module.exports = {
    login_handler,
    register_handler
}