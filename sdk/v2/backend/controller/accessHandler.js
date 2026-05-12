const { createAccess, updateAccess, getAllAccess, deleteAccess } = require("../services/accessService.js");

async function createAccess_handler(request, response) {

    if (request.method === "POST") {

        let bodyComplete = "";

        // * obtengo los datos del body
        request.on("data", (paquete) => {
            bodyComplete += paquete.toString();
        })

        request.on("end", async () => {
            const objetoResultante = JSON.parse(bodyComplete)

            try {

                // *se los paso al metodo de LOGICA DE NEGOCIOS
                const output = await createAccess(objetoResultante);

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


async function updateAccess_handler(request, response) {

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
                const output = await updateAccess(objetoResultante);

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


async function getAccessAll_handler(request, response) {

    if (request.method === "GET") {

        try {

            // *se los paso al metodo de LOGICA DE NEGOCIOS
            const output = await getAllAccess();

            // * creo una RESPUESTA en base a lo que me devolvio la DB
            response.writeHead(output.status, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(output));

        } catch (error) {
            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(error.message));
        }
    }
}


async function deleteAccess_handler(request, response) {

    if (request.method === "DELETE") {

        let bodyComplete = "";  // * obtengo los datos del body

        request.on("data", (paquete) => {
            bodyComplete += paquete.toString();
        })

        request.on("end", async () => {
            const objetoResultante = JSON.parse(bodyComplete)

            try {

                // *se los paso al metodo de LOGICA DE NEGOCIOS
                const output = await deleteAccess(objetoResultante);

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








module.exports = { createAccess_handler, updateAccess_handler, getAccessAll_handler, deleteAccess_handler }