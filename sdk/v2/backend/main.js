const { createServer } = require('node:http');
const { URL } = require('node:url');

const { default_handler } = require('./controller/pageHandler');
const { login_handler, register_handler } = require('./controller/authHandler');

const config = require("./lib/config.js");

const router = require("./lib/router.js")

const { initializeUserTable } = require('./models/user.js');
const { initializeGroupTable } = require('./models/group.js');
const { initializeEndpointTable } = require('./models/endpoint.js');
const { initializeMemberTable } = require('./models/member.js');

initializeEndpointTable();
initializeUserTable();
initializeGroupTable();
initializeMemberTable();

const object_route = router();

//Despachador principal
async function request_dispatcher(request, response) {
  // *obtiene la ruta
  const url = new URL(request.url, 'http://' + config.server.ip);
  const path = url.pathname;

  // *devuelve el valor del MAPA, en este caso una funcion o undefined
  const handler = object_route.get(path);

  if (handler) {
    return await handler(request, response);
  }

  response.writeHead(404);
  response.end('Metodo no encontrado');
}

function start() {
  console.log(`Servidor escuchando en http://localhost:${config.server.port}`);
}

// * cuando el puerto de la peticion coincide con el puerto del objeto servidor, invoca
// * internamente al callback pasado por createServer()
let server = createServer(request_dispatcher);

// * el objeto servidor intenta ocupar el puerto para escuchar peticiones y ejecuta el callback.
server.listen(config.server.port, config.server.ip, start);
