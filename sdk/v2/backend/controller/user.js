const console = require('node:console');
const { updateUser, deleteUser, getUsersAll } = require("../services/user.js");

async function UpdateUser(request, response) {

    if (request.method == "PUT") {

        let bodyComplete = "";

        // * obtengo los datos del body
        request.on("data", (paquete) => {
            bodyComplete += paquete.toString();
        })

        request.on("end", async () => {
            const dataUser = JSON.parse(bodyComplete)

            try {

                // *se los paso al metodo de LOGICA DE NEGOCIOS
                const output = await updateUser(dataUser);

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

async function DeleteUser(request, response) {

    if (request.method == "DELETE") {

        let bodyComplete = "";

        // * obtengo los datos del body
        request.on("data", (paquete) => {
            bodyComplete += paquete.toString();
        })

        request.on("end", async () => {
            const dataUser = JSON.parse(bodyComplete)

            try {

                // *se los paso al metodo de LOGICA DE NEGOCIOS
                const output = await deleteUser(dataUser);

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

async function GetUsersAll(request, response) {

    if (request.method == "GET") {


        try {

            // *se los paso al metodo de LOGICA DE NEGOCIOS
            const output = await getUsersAll();

            // * creo una RESPUESTA en base a lo que me devolvio la DB
            response.writeHead(output.status, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(output));


        } catch (error) {

            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({message: error.message}));
        }


    }
}



module.exports = { UpdateUser, DeleteUser, GetUsersAll }