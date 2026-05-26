const { createServer } = require('node:http');
const { URL } = require('node:url');

const config = require("./lib/config.js");

const loadRouterMap = require("./lib/router.js")

const { InitializeUserTable } = require('./models/user.js');
const { InitializeGroupTable } = require('./models/group.js');
const { InitializeEndpointTable } = require('./models/endpoint.js');
const { InitializeMemberTable } = require('./models/member.js');
const {InitializeAccessTable} = require("./models/access.js");

InitializeEndpointTable();
InitializeUserTable();
InitializeGroupTable();
InitializeMemberTable();
InitializeAccessTable();


const object_route = loadRouterMap();

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
