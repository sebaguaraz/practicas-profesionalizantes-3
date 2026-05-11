const { insertarEndpoint } = require("../models/endpoint.js")

async function createEndpoint(objetoResultante) {

    const { path } = objetoResultante

    if (!path) {

        return { status: 400, message: "Campo Obligatorio para crear endpoint..." }
    }

    try {

        // * si insertarGrupo() hace reject(err), await lanza ese error
        // * y el catch de esta funcion lo atrapa, por eso newGroup no llega a asignarse
        // * si falla la promesa internamente await hace throw new Error()
        const newEndpoint = await insertarEndpoint(path.trim());

        return { status: 200, id: newEndpoint.id, path: newEndpoint.path, message: "Endpoint creado con exito!!!" }

    } catch (error) {

        return { status: 500, message: error.message }
    }

}


module.exports = { createEndpoint }