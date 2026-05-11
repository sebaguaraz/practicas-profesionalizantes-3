const {createEndpoint} = require("../services/endpointService.js")


async function createEndpoint_handler(request, response) {

    if (request.method == "POST") {

        let bodyComplete = "";

        // * obtengo los datos del body
        request.on("data", (paquete) => {
            bodyComplete += paquete.toString();
        })

        request.on("end", async () => {
            const objetoResultante = JSON.parse(bodyComplete)

            try {

                // *se los paso al metodo de LOGICA DE NEGOCIOS
                const output = await createEndpoint(objetoResultante);

                // * creo una RESPUESTA en base a lo que me devolvio la DB
                response.writeHead(output.status, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(output));

            } catch (error) {
                // * si ocurre un error en la logica de negocio que no se atrapa en su catch entra aca...
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(error.message));
            }




        })
    }


}



module.exports = { createEndpoint_handler };