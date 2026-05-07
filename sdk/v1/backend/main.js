const { createServer } = require('node:http');
const { URL } = require('node:url');

const { default_handler } = require('./controller/pageController');
const { login_handler, register_handler } = require('./controller/authHandler');

const config = require("./lib/config.js");

const router = require("./lib/router.js")

const { initializeUserTable } = require('./models/user.js');

initializeUserTable();

const object_route = router();

//Despachador principal
async function request_dispatcher(request, response) {
  // *obtiene la ruta 
  const url = new URL(request.url, 'http://' + config.server.ip);
  const path = url.pathname;

  // *devuelve el valor del MAPA , en este caso una funcion o undefined sino hay una clave con ese "PATH"
  const handler = object_route.get(path)

  if (handler) {
    return await handler(request, response);
  }
  else {
    response.writeHead(404);
    response.end('Método no encontrado');
  }
}

function start() {
  console.log(`Servidor escuchando en http://localhost:${config.server.port}`);
}

// * cuando el puerto de la peticion coincide con el puerto del objeto servidor, invoca internamente al callback pasado por la createServer(). Como ese callback esta guardado internamente en el objeto servidor, la invoca y le pasa un objeto req (datos del cliente) y objeto res (para armar respuestas) para realizar la ejecucion del callback
let server = createServer(request_dispatcher);


// * el objeto servidor intenta ocupar el puerto para escuchar peticiones y ejecuta el callback.
server.listen(config.server.port, config.server.ip, start);