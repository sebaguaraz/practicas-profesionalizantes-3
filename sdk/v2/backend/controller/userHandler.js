const console = require('node:console');
const { updateUser_Service, deleteUser_Service, getUsersAll_Service } = require("../services/userService.js");


async function updateUser_handler(request, response) {

    if (request.method == "PUT") {

        let bodyComplete = "";

        // * obtengo los datos del body
        request.on("data", (paquete) => {
            bodyComplete += paquete.toString();
        })

        request.on("end", async () => {
            const objetoResultante = JSON.parse(bodyComplete)

            try {

                // *se los paso al metodo de LOGICA DE NEGOCIOS
                const output = await updateUser_Service(objetoResultante);

                // * creo una RESPUESTA en base a lo que me devolvio la DB
                response.writeHead(output.status, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(output));


            } catch (error) {

                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(error.message));
            }


        })



    }
}

async function deleteUser_handler(request, response) {

    if (request.method == "DELETE") {

        let bodyComplete = "";

        // * obtengo los datos del body
        request.on("data", (paquete) => {
            bodyComplete += paquete.toString();
        })

        request.on("end", async () => {
            const objetoResultante = JSON.parse(bodyComplete)

            try {

                // *se los paso al metodo de LOGICA DE NEGOCIOS
                const output = await deleteUser_Service(objetoResultante);

                // * creo una RESPUESTA en base a lo que me devolvio la DB
                response.writeHead(output.status, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(output));


            } catch (error) {

                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(error.message));
            }


        })



    }
}

async function getUsersAll_handler(request, response) {

    if (request.method == "GET") {


        try {

            // *se los paso al metodo de LOGICA DE NEGOCIOS
            const output = await getUsersAll_Service();

            // * creo una RESPUESTA en base a lo que me devolvio la DB
            response.writeHead(output.status, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(output));


        } catch (error) {

            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(error.message));
        }


    }
}



module.exports = { updateUser_handler, deleteUser_handler, getUsersAll_handler }