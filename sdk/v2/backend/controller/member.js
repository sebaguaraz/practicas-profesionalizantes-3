const {createMember, updateMember, getMembers, deleteMember} = require("../services/member");

async function CreateMember(request, response){

    if(request.method === "POST"){

        let bodyComplete = "";

        // * obtengo los datos del body
        request.on("data", (paquete) => {
            bodyComplete += paquete.toString();
        })

        request.on("end", async () => {
            try {
                const dataMember = JSON.parse(bodyComplete);

                // *se los paso al metodo de LOGICA DE NEGOCIOS
                const output = await createMember(dataMember);

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

async function UpdateMember(request, response){

    if(request.method === "PUT"){

        let bodyComplete = "";

        // * obtengo los datos del body
        request.on("data", (paquete) => {
            bodyComplete += paquete.toString();
        })

        request.on("end", async () => {
            try {
                const dataMember = JSON.parse(bodyComplete);

                // *se los paso al metodo de LOGICA DE NEGOCIOS
                const output = await updateMember(dataMember);

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

async function DeleteMember(request, response){

    if(request.method === "DELETE"){

        let bodyComplete = "";

        // * obtengo los datos del body
        request.on("data", (paquete) => {
            bodyComplete += paquete.toString();
        })

        request.on("end", async () => {
            try {
                const dataMember = JSON.parse(bodyComplete);

                // *se los paso al metodo de LOGICA DE NEGOCIOS
                const output = await deleteMember(dataMember);

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

async function GetMembers(request, response){

    if(request.method == "GET"){

        try {

            const output = await getMembers();

            // * creo una RESPUESTA en base a lo que me devolvio la DB
            response.writeHead(output.status, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(output));

        } catch (error) {

            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({message: error.message}));
        }
    }
}



module.exports = {
    CreateMember,
    UpdateMember,
    DeleteMember,
    GetMembers
}