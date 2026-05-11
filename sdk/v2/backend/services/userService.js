const console = require('node:console');
const { getUserById, updateUser, deleteUser, getUsersAll } = require("../models/user.js");


async function updateUser_Service(objetoResultante) {

    const { id_user, password, } = objetoResultante

    if (!id_user || !password) {
        return { status: 400, message: "El id y contraseña son campos obligatorios" }
    }

    try {
        const userExists = await getUserById(id_user);

        if (!userExists) {
            return { status: 400, message: "El usuario no existe" }
        }

        const result = await updateUser(userExists.id, password.trim());
        if (!result) {
            return { status: 400, message: "El usuario no pudo ser modificado" }
        }

        return { id: result.id, status: 200, message: "Usuario modificado con exito" };

    } catch (error) {
        return { status: 500, message: error.message };
    }


}

async function deleteUser_Service(objetoResultante) {

    const { id_user } = objetoResultante

    if (!id_user) {
        return { status: 400, message: "El id es un campo obligatorio" }
    }

    try {

        const userExists = await getUserById(id_user);

        if (!userExists) {
            return { status: 400, message: "El usuario no existe" }
        }

        const id = userExists.id;

        const result = await deleteUser(id)

        if (!result) {
            return { status: 400, message: "El usuario no pudo ser eliminado" }
        }

        return { id: id, status: 200, message: "Usuario eliminado con exito" };


    } catch (error) {
        return { status: 500, message: error.message };
    }
}


async function getUsersAll_Service() {

    try {

        const result = await getUsersAll();

        if (!result) {
            return { status: 400, message: "No existen usuarios" };
        }

        return { status: 200, lista: result };

    } catch (error) {
        return { status: 500, message: error.message };
    }



}





module.exports = { updateUser_Service, deleteUser_Service, getUsersAll_Service }
