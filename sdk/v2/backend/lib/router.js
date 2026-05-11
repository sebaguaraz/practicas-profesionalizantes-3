const { default_handler } = require("../controller/pageHandler");

// * importamos modulos de autenticacion
const { login_handler, register_handler } = require('../controller/authHandler');

// * importamos modulos grupo
const {createGroup_handler, updateGroup_handler, getGroup_handler, deleteGroup_handler}  = require('../controller/groupHandler');

// * importamos modulos usuario
const { updateUser_handler, deleteUser_handler, getUsersAll_handler } = require("../controller/userHandler");

// * importamos modulos endpoint
const { createEndpoint_handler } = require("../controller/endpointHandler");


// * importamos modulos miembros
const { createMember_handler, updateMember_handler, deleteMember_handler, getMembers_handler } = require("../controller/memberHandler");


function route() {

    let router = new Map();

    // * Guardo una función anónima que, al ejecutarse en el dispatcher, llama a default_handler
    // * pasando request, response.

    // *ruta principal
    router.set('/', (request, response) => default_handler(request, response));

    // *rutas de autenticacion
    router.set('/login', (request, response) => login_handler(request, response));
    router.set('/register', (request, response) => register_handler(request, response));

    // * rutas de usuario
    router.set("/updateUser", (request, response) => updateUser_handler(request, response));
    router.set("/deleteUser", (request, response) => deleteUser_handler(request, response));
    router.set("/getUsersAll", (request, response) => getUsersAll_handler(request, response));

    // * rutas de grupo
    router.set("/createGroup", (request, response) => createGroup_handler(request, response));
    router.set("/updateGroup", (request, response) => updateGroup_handler(request, response));
    router.set("/getGroupAll", (request, response) => getGroup_handler(request, response));
    router.set("/deleteGroup", (request, response) => deleteGroup_handler(request, response));

    // * rutas de endpoint
    router.set("/createEndpoint", (request, response) => createEndpoint_handler(request, response));
    
    // * rutas de miembros
    router.set("/createMember", (request, response) => createMember_handler(request, response));
    router.set("/updateMember", (request, response) => updateMember_handler(request, response));
    router.set("/deleteMember", (request, response) => deleteMember_handler(request, response));
    router.set("/getMemberAll", (request, response) => getMembers_handler(request, response));

    return router;

}

module.exports = route;