const {crearMiembro, modificarMiembro, obtenerMiembros, eliminarMiembro} = require("../models/member")

async function createMember(objetoResultante){

    const {id_group, id_user} = objetoResultante

    if(!id_group || !id_user){
        return {status: 400, message: "Campos obligatorios"}
    }

    try{
        const result = await crearMiembro(id_group, id_user)
        return {id: result.id, status: 200, message: "Miembro creado con exito"}
    
    }catch(error){
        return {status: 500, message: error.message}
    }
}

async function updateMember(objetoResultante){
    const {old_id_group, new_id_group, id_user} = objetoResultante

    if(!id_group || !id_user || !new_id_group){
        return {status: 400, message: "Campos obligatorios"}
    }

    try{
        const result = await modificarMiembro(id_user, old_id_group, new_id_group)

        if(!result){
            return {status: 400, message: "Miembro no encontrado"}
        }

        return {status: 200, message: "Miembro modificado con exito"}
    
    }catch(error){
        return {status: 500, message: error.message}
    }
}

async function getMembers(){
    
    try{
        const result = await obtenerMiembros()

        if(!result){
            return {status: 400, message: "No existen miembros"}
        }

        return {status: 200, lista: result}
    
    }catch(error){
        return {status: 500, message: error.message}
    }
}

async function deleteMember(objetoResultante){
    const {id_group, id_user} = objetoResultante
    
    if(!id_group || !id_user){
        return {status: 400, message: "Campos obligatorios"}
    }

    try{
        const result = await eliminarMiembro(id_group, id_user)

        if(!result){
            return {status: 400, message: "Miembro no encontrado"}
        }
        return {id: result.id, status: 200, message: "Miembro eliminado con exito"}
    
    }catch(error){
        return {status: 500, message: error.message}
    }
}





module.exports = {createMember, updateMember, getMembers, deleteMember}