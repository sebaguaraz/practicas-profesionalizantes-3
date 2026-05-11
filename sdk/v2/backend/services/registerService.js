//Lógica de negocio / Services (Son independientes de protocolos, comunicaciones directa a la db y servidor)
const { insertarUsuario } = require('../models/user.js');
const console = require('node:console');




async function register(objetoResultante) {

  // *DESTRUCTURACION: creo variables que almacena los valores de las propiedades del objeto
  const { username, password } = objetoResultante;

  if (!username || !password) {
    return { status: 400, message: "El usuario y contraseña son campos obligatorios" }
  }



  // Uso
  try {

    const result = await insertarUsuario(username.trim(), password.trim());

    return { id: result.id, username: result.username, status: 200, message: "Usuario registrado con exito" };


  } catch (error) {
    console.log(error.message);
    return { status: 500, message: error.message };
  }



}


module.exports = register;
