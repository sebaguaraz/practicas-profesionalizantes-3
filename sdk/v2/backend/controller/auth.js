const { URL } = require('node:url');
const console = require('node:console');
const register = require("../services/register.js");
const login = require("../services/login.js");

const config = require("../lib/config.js");


//* -------------- HANDLER / CONTROLLER

async function Login(request, response) {
    if (request.method == "POST") {

        let bodyComplete = "";

        // * obtengo los datos del body
        request.on("data", (paquete) => {
            bodyComplete += paquete.toString();
        })

        request.on("end", async () => {
            const dataUser = JSON.parse(bodyComplete)

            try {
                // *se los paso al metodo de LOGICA DE NEGOCIOS
                const output = await login(dataUser);

                // * creo una RESPUESTA en base a lo que me devolvio la login()
                response.writeHead(output.status, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(output));


            } catch (error) {
                // * si ocurre un error en la logica de negocio que no se atrapa en su catch entra aca...
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({message: error.message}));
            }
        })

    }

}


function Register(request, response) {

    // * si el metodo de la peticion es POST accede a los datos de una forma diferente
    if (request.method == "POST") {

        let bodyComplete = "";

        // * obtengo los datos del body
        request.on("data", (paquete) => {
            bodyComplete += paquete.toString();
        })

        request.on("end", async () => {
            const dataUser = JSON.parse(bodyComplete)

            try {

                // *se los paso al metodo de LOGICA DE NEGOCIOS
                const output = await register(dataUser);

                // * creo una RESPUESTA en base a lo que me devolvio la DB
                response.writeHead(output.status, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(output));


            } catch (error) {
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({message: error.message}));
            }
        })

    }



}


module.exports = {
    Login,
    Register
}