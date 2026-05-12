const { crearAcceso, modificarAcceso, obtenerAccesos, eliminarAcceso } = require("../models/access.js");

const { getEndpointById } = require("../models/endpoint.js");


async function createAccess(objetoResultante) {

    const { id_group, id_endpoint } = objetoResultante

    if (!id_group || !id_endpoint) {
        return { status: 400, message: "Campos obligatorios" }
    }

    try {

        
        const result = await crearAcceso(id_group, id_endpoint)
        return { id: result.id, status: 200, message: "Acceso creado con exito" }

    } catch (error) {
        return { status: 500, message: error.message }
    }
}

async function updateAccess(objetoResultante) {
    const { id_group, id_endpoint_old, id_endpoint_new } = objetoResultante;

    if (!id_group || !id_endpoint_old || !id_endpoint_new) {
        return { status: 400, message: "Campos obligatorios" };
    }

    try {
        
        const existsEndpointNew = await getEndpointById(id_endpoint_new);
        if(!existsEndpointNew){
            return { status: 400, message: "Endpoint Nuevo no encontrado" };
        }


        const result = await modificarAcceso(id_group, id_endpoint_old, existsEndpointNew.id);

        if (!result) {
            return { status: 400, message: "Acceso no encontrado" };
        }

        return { status: 200, message: "Acceso modificado con exito" };
    } catch (error) {
        return { status: 500, message: error.message };
    }
}

async function getAllAccess() {

    try {
        const result = await obtenerAccesos()

        if (!result) {
            return { status: 400, message: "Accesos no encontrados" }
        }

        return { status: 200, lista: result }

    } catch (error) {
        return { status: 500, message: error.message }
    }
}

async function deleteAccess(objetoResultante) {

    const { id_group, id_endpoint } = objetoResultante

    if (!id_group || !id_endpoint) {
        return { status: 400, message: "Campos obligatorios" }
    }

    try {
        const result = await eliminarAcceso(id_group, id_endpoint)

        if (!result) {
            return { status: 400, message: "Acceso no encontrado" }
        }
        return { status: 200, message: result.message }


    } catch (error) {
        return { status: 500, message: error.message }
    }
}

module.exports = {
    createAccess,
    updateAccess,
    getAllAccess,
    deleteAccess
}   