//Lógica de negocio / Services (Son independientes de protocolos, comunicaciones directa a la db y servidor)
const { GetUserByNameDB } = require('../models/user.js');


async function login(dataUser) {

  const { username, password } = dataUser


  let output =
  {
    status: null,
    result: null,
    message: 'INVALID_USER_PASS'
  };

  try {

    if (!username || !password) {
      output.status = 400;
      output.data = null;
      output.message = 'campos obligatorios';
      return output
    }

    const userExists = await GetUserByNameDB(username.trim());

    if (!userExists) {
      output.status = 400;
      output.data = null;
      output.message = 'INVALID_USER_PASS';
      return output


    }

    output.status = 200
    output.data = { id: userExists.id, username: userExists.username };
    output.message = "SUCCESSFUL_LOGIN";

    return output;

  } catch (error) {

    output.status = 500;
    output.data = null;
    output.message = error.message;
    return output
  }

}



module.exports = login 