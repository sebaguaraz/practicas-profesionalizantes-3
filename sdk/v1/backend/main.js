const { createServer } = require('node:http');
const { URL } = require('node:url');

const load_config = require("./config/config.js");
const { connect_db } = require('./database/db');
const { default_handler } = require('./controller/pageController');
const { login_handler, register_handler } = require('./controller/authHandler');

const resultConfig = load_config();
const ObjectDB = connect_db(resultConfig.database.path);

const routes = require("../backend/router/router.js")

const route = routes(resultConfig, ObjectDB);

//Despachador principal
async function request_dispatcher(request, response) {
  // *obtiene la ruta 
  const url = new URL(request.url, 'http://' + resultConfig.server.ip);
  const path = url.pathname;

  // *devuelve el valor del MAPA , en este caso una funcion o undefined sino hay una clave con ese "PATH"
  const handler = route.get(path)

  if (handler) {
    return await handler(request, response);
  }
  else {
    response.writeHead(404);
    response.end('Método no encontrado');
  }
}

function start() {
  console.log('Servidor ejecutándose... ');
}

// * cuando el puerto de la peticion coincide con el puerto del objeto servidor, invoca internamente al callback pasado por la createServer(). Como ese callback esta guardado internamente en el objeto servidor, la invoca y le pasa un objeto req (datos del cliente) y objeto res (para armar respuestas) para realizar la ejecucion del callback
let server = createServer(request_dispatcher);


// * el objeto servidor intenta ocupar el puerto para escuchar peticiones y ejecuta el callback.
server.listen(resultConfig.server.port, resultConfig.server.ip, start);