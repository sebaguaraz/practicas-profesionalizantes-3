//Lógica de negocio / Services (Son independientes de protocolos, comunicaciones directa a la db y servidor)
const { insertarUsuario } = require('../database/db');

async function register(objetoResultante, db) {

  // *DESTRUCTURACION: creo variables que almacena los valores de las propiedades del objeto
  const { username, password } = objetoResultante;

  let arrayList = ["pepe", "pedro"]
  if (!username || !password) {
    return { message: "El usuario y contraseña son campos obligatorios" }
  }
  else if (arrayList.includes(username)) {
    return { message: "El nombre ingresado no es valido!" }
  }


  // Uso
  try {

    const result = await insertarUsuario(db, username, password)
    
    const {id, ...objectResult} = result
    return { 'Usuario insertado: ': objectResult };


  } catch (error) {
    return error
  }


}


module.exports = register;
