const console = require('node:console');
const { createGroup, updateGroup, getAllGroup, deleteGroup } = require("../services/groupService.js")



async function createGroup_handler(request, response) {

    // * si el metodo de la peticion es POST accede a los datos de una forma diferente
    if (request.method == "POST") {

        let bodyComplete = "";

        // * obtengo los datos del body
        request.on("data", (paquete) => {
            bodyComplete += paquete.toString();
        })

        request.on("end", async () => {
            try {

                const objetoResultante = JSON.parse(bodyComplete)
                const output = await createGroup(objetoResultante);

                response.writeHead(output.status, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(output));

            } catch (error) {
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(error.message));
            }
        })


    }




}

// *node crea req y res y lo llena con lo basico (method, url). Luego req.body lo lleno yo al recorrer y concatenar el paquete, lo parseo y lo guardo en req.body. Si uso express este proceso lo hace automaticamente. PARSEANDOLO A JSON 
async function updateGroup_handler(request, response) {

    if (request.method == "PUT") {

        let bodyComplete = "";

        // * obtengo los datos del body
        request.on("data", (paquete) => {
            bodyComplete += paquete.toString();
        })

        request.on("end", async () => {
            try {

                const objetoResultante = JSON.parse(bodyComplete)
                const output = await updateGroup(objetoResultante);

                response.writeHead(output.status, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(output));

            } catch (error) {
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(error.message));
            }
        })



    }


}


async function getGroup_handler(request, response) {

    if (request.method == "GET") {

        try {

            const output = await getAllGroup();

            response.writeHead(output.status, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(output));

        } catch (error) {
            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(error.message));
        }
        

    }

}


async function deleteGroup_handler(request, response) {
    if (request.method == "DELETE") {


        let bodyComplete = "";

        // * obtengo los datos del body
        request.on("data", (paquete) => {
            bodyComplete += paquete.toString();
        })

        request.on("end", async () => {
            try {
                const objetoResultante = JSON.parse(bodyComplete)
                const output = await deleteGroup(objetoResultante);

                response.writeHead(output.status, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(output));

            } catch (error) {
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(error.message));
            }
        })



    }


}

module.exports = { createGroup_handler, updateGroup_handler, getGroup_handler, deleteGroup_handler }; 
