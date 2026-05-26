const console = require('node:console');
const { GetUserByNameDB,
    GetUserByIdDB,
    GetUsersAllDB,
    UpdateUserDB,
    DeleteUserDB } = require("../models/user.js");


async function updateUser(dataUser) {

    const { id_user, password, } = dataUser

    if (!id_user || !password) {
        return { status: 400, message: "El id y contraseña son campos obligatorios" }
    }

    try {
        const userExists = await GetUserByIdDB(id_user);

        if (!userExists) {
            return { status: 400, message: "El usuario no existe" }
        }

        const result = await UpdateUserDB(userExists.id, password.trim());
        if (!result) {
            return { status: 400, message: "El usuario no pudo ser modificado" }
        }

        return { id: result.id, status: 200, message: "Usuario modificado con exito" };

    } catch (error) {
        return { status: 500, message: error.message };
    }


}

async function deleteUser(dataUser) {

    const { id_user } = dataUser

    if (!id_user) {
        return { status: 400, message: "El id es un campo obligatorio" }
    }

    try {

        const userExists = await GetUserByIdDB(id_user);

        if (!userExists) {
            return { status: 400, message: "El usuario no existe" }
        }

        const id = userExists.id;

        const result = await DeleteUserDB(id)

        if (!result) {
            return { status: 400, message: "El usuario no pudo ser eliminado" }
        }

        return { id: id, status: 200, message: "Usuario eliminado con exito" };


    } catch (error) {
        return { status: 500, message: error.message };
    }
}


async function getUsersAll() {

    try {

        const result = await GetUsersAllDB();

        if (!result) {
            return { status: 400, message: "No existen usuarios" };
        }

        return { status: 200, lista: result };

    } catch (error) {
        return { status: 500, message: error.message };
    }



}





module.exports = { updateUser, deleteUser, getUsersAll }
