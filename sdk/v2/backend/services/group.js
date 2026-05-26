const { insertGroupDB, UpdateGroupDB, GetGroupDB, DeleteGroupDB, GetGroupByIdDB } = require("../models/group")

async function createGroup(objetoResultante) {

    const { name } = objetoResultante

    if (!name) {

        return { status: 400, message: "Campo Obligatorio para crear grupo..." }
    }

    try {
        // * si insertarGrupo() hace reject(err), await lanza ese error
        // * y el catch de esta funcion lo atrapa, por eso newGroup no llega a asignarse
        // * si falla la promesa internamente await hace throw new Error()
        const newGroup = await insertGroupDB(name.trim());


        return { status: 200, id: newGroup.id, name: newGroup.name, message: "Grupo creado con exito!!!" }

    } catch (error) {
        return { status: 500, message: error.message }
    }




}

async function updateGroup(objetoResultante) {
    const { id_group, name } = objetoResultante;
    if (!id_group || !name) {
        return { status: 400, message: "Campos obligatorios" }
    }

    try {

        const result = await UpdateGroupDB(id_group, name.trim())

        if (!result) {
            return { status: 400, message: "No se realizo cambios" }
        }

        return { status: 200, message: `grupo con ID ${result.id} modificado con exito` }

    } catch (error) {
        return { status: 500, message: error.message }
    }
}


async function getAllGroup() {


    try {

        const result = await GetGroupDB();
        if (!result) {
            return { status: 400, message: `no se encontraron grupos` }
        }

        console.log(result)
        return { status: 200, lista: result }


    } catch (error) {
        return { status: 500, message: error.message }
    }



}

async function deleteGroup(objetoResultante) {

    const { id_group } = objetoResultante
    if (!id_group) {
        return { status: 400, message: "El id es un campo obligatorio" }
    }

    try {

        const result = await DeleteGroupDB(id_group);
        if (!result) {
            return { status: 400, message: `grupo con ID ${id_group} no encontrado` }
        }

        return { status: 200, message: `grupo con ID ${result.id} eliminado con exito` }

    } catch (error) {
        return { status: 500, message: error.message }
    }
}

module.exports = { createGroup, updateGroup, getAllGroup, deleteGroup }