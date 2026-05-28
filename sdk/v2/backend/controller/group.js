const console = require('node:console');
const { createGroup, updateGroup, getAllGroup, deleteGroup } = require("../services/group.js")



async function CreateGroup(request, response) {

    // * si el metodo de la peticion es POST accede a los datos de una forma diferente
    if (request.method == "POST") {

        let bodyComplete = "";

        // * obtengo los datos del body
        request.on("data", (paquete) => {
            bodyComplete += paquete.toString();
        })

        request.on("end", async () => {
            try {

                const dataGroup = JSON.parse(bodyComplete)
                const output = await createGroup(dataGroup);

                response.writeHead(output.status, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(output));

            } catch (error) {
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({message: error.message}));
            }
        })


    }




}

// *node crea req y res y lo llena con lo basico (method, url). Luego req.body lo lleno yo al recorrer y concatenar el paquete, lo parseo y lo guardo en req.body. Si uso express este proceso lo hace automaticamente. PARSEANDOLO A JSON 
async function UpdateGroup(request, response) {

    if (request.method == "PUT") {

        let bodyComplete = "";

        // * obtengo los datos del body
        request.on("data", (paquete) => {
            bodyComplete += paquete.toString();
        })

        request.on("end", async () => {
            try {

                const dataGroup = JSON.parse(bodyComplete)
                const output = await updateGroup(dataGroup);

                response.writeHead(output.status, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(output));

            } catch (error) {
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({message: error.message}));
            }
        })



    }


}


async function GetGroup(request, response) {

    if (request.method == "GET") {

        try {

            const output = await getAllGroup();

            response.writeHead(output.status, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(output));

        } catch (error) {
            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({message: error.message}));
        }
        

    }

}


async function DeleteGroup(request, response) {
    if (request.method == "DELETE") {


        let bodyComplete = "";

        // * obtengo los datos del body
        request.on("data", (paquete) => {
            bodyComplete += paquete.toString();
        })

        request.on("end", async () => {
            try {
                const dataGroup = JSON.parse(bodyComplete)
                const output = await deleteGroup(dataGroup);

                response.writeHead(output.status, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(output));

            } catch (error) {
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({message: error.message}));
            }
        })



    }


}

module.exports = { CreateGroup, UpdateGroup, GetGroup, DeleteGroup }; 
