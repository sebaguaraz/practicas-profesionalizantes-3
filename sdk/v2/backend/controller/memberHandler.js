const {createMember, updateMember, getMembers, deleteMember} = require("../services/memberService");

async function createMember_handler(request, response){

    if(request.method === "POST"){

        let bodyComplete = "";

        // * obtengo los datos del body
        request.on("data", (paquete) => {
            bodyComplete += paquete.toString();
        })

        request.on("end", async () => {
            try {
                const objetoResultante = JSON.parse(bodyComplete);

                // *se los paso al metodo de LOGICA DE NEGOCIOS
                const output = await createMember(objetoResultante);

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

async function updateMember_handler(request, response){

    if(request.method === "PUT"){

        let bodyComplete = "";

        // * obtengo los datos del body
        request.on("data", (paquete) => {
            bodyComplete += paquete.toString();
        })

        request.on("end", async () => {
            try {
                const objetoResultante = JSON.parse(bodyComplete);

                // *se los paso al metodo de LOGICA DE NEGOCIOS
                const output = await updateMember(objetoResultante);

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

async function deleteMember_handler(request, response){

    if(request.method === "DELETE"){

        let bodyComplete = "";

        // * obtengo los datos del body
        request.on("data", (paquete) => {
            bodyComplete += paquete.toString();
        })

        request.on("end", async () => {
            try {
                const objetoResultante = JSON.parse(bodyComplete);

                // *se los paso al metodo de LOGICA DE NEGOCIOS
                const output = await deleteMember(objetoResultante);

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

async function getMembers_handler(request, response){

    if(request.method === "GET"){

        try {

            const output = await getMembers();

            // * creo una RESPUESTA en base a lo que me devolvio la DB
            response.writeHead(output.status, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(output));

        } catch (error) {

            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(error.message));
        }
    }
}



module.exports = {
    createMember_handler,
    updateMember_handler,
    deleteMember_handler,
    getMembers_handler
}