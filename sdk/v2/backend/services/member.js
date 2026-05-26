const { CreateMemberDB,
    UpdateMemberDB,
    GetMemberDB,
    DeleteMemberDB } = require("../models/member")

const { GetGroupByIdDB } = require("../models/group")

async function createMember(dataMember) {

    const { id_group, id_user } = dataMember

    if (!id_group || !id_user) {
        return { status: 400, message: "Campos obligatorios" }
    }

    try {
        const result = await CreateMemberDB(id_group, id_user)
        return { id: result.id, status: 200, message: "Miembro creado con exito" }

    } catch (error) {
        return { status: 500, message: error.message }
    }
}

async function updateMember(dataMember) {
    const { old_id_group, new_id_group, id_user } = dataMember

    if (!old_id_group || !id_user || !new_id_group) {
        return { status: 400, message: "Campos obligatorios" }
    }

    try {

        const existsNewGroup = await GetGroupByIdDB(new_id_group)
        if (!existsNewGroup) {
            return { status: 400, message: "Grupo Nuevo no encontrado" }
        }

        const result = await UpdateMemberDB(id_user, old_id_group, existsNewGroup.id)

        if (!result) {
            return { status: 400, message: "Miembro no encontrado" }
        }

        return { status: 200, message: "Miembro modificado con exito" }

    } catch (error) {
        return { status: 500, message: error.message }
    }
}

async function getMembers() {

    try {
        const result = await GetMemberDB()

        if (!result) {
            return { status: 400, message: "No existen miembros" }
        }

        return { status: 200, lista: result }

    } catch (error) {
        return { status: 500, message: error.message }
    }
}

async function deleteMember(dataMember) {
    const { id_group, id_user } = dataMember

    if (!id_group || !id_user) {
        return { status: 400, message: "Campos obligatorios" }
    }

    try {
        const result = await DeleteMemberDB(id_group, id_user)

        if (!result) {
            return { status: 400, message: "Miembro no encontrado" }
        }
        return { id: result.id, status: 200, message: "Miembro eliminado con exito" }

    } catch (error) {
        return { status: 500, message: error.message }
    }
}





module.exports = { createMember, updateMember, getMembers, deleteMember }