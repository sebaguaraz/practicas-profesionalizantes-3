const {createEndpoint} = require("../services/endpoint.js")


async function CreateEndpoint(request, response) {

    if (request.method == "POST") {

        let bodyComplete = "";

        // * obtengo los datos del body
        request.on("data", (paquete) => {
            bodyComplete += paquete.toString();
        })

        request.on("end", async () => {
            const dataEndpoint = JSON.parse(bodyComplete)

            try {

                // *se los paso al metodo de LOGICA DE NEGOCIOS
                const output = await createEndpoint(dataEndpoint);

                // * creo una RESPUESTA en base a lo que me devolvio la DB
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



module.exports = { CreateEndpoint };