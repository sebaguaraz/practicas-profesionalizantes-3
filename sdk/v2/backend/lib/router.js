const { Default } = require("../controller/page");

// * importamos modulos de autenticacion
const { Login, Register } = require('../controller/auth');

// * importamos modulos grupo
const {CreateGroup, UpdateGroup, GetGroup, DeleteGroup}  = require('../controller/group');

// * importamos modulos usuario
const {UpdateUser, DeleteUser, GetUsersAll } = require("../controller/user");

// * importamos modulos endpoint
const { CreateEndpoint } = require("../controller/endpoint");

// * importamos modulos miembros
const { CreateMember, UpdateMember, DeleteMember, GetMembers } = require("../controller/member");

// * importamos modulos accesos
const { CreateAccess, UpdateAccess, GetAccessAll, DeleteAccess } = require("../controller/access");

function loadRouterMap() {

    let router = new Map();

    // * Guardo una función anónima que, al ejecutarse en el dispatcher, llama a default
    // * pasando request, response.

    // *ruta principal
    router.set('/', Default);

    // *rutas de autenticacion
    router.set('/login', Login);
    router.set('/register', Register);

    // * rutas de usuario
    router.set("/updateUser", UpdateUser);
    router.set("/deleteUser", DeleteUser);
    router.set("/getUsersAll", GetUsersAll);

    // * rutas de grupo
    router.set("/createGroup", CreateGroup);
    router.set("/updateGroup", UpdateGroup);
    router.set("/getGroupAll", GetGroup);
    router.set("/deleteGroup", DeleteGroup);

    // * rutas de endpoint
    router.set("/createEndpoint", CreateEndpoint);
    
    // * rutas de miembros
    router.set("/createMember", CreateMember);
    router.set("/updateMember", UpdateMember);
    router.set("/deleteMember", DeleteMember);
    router.set("/getMemberAll", GetMembers);
    
    // * rutas de accesos
    router.set("/createAccess", CreateAccess);
    router.set("/updateAccess", UpdateAccess);
    router.set("/getAccessAll", GetAccessAll);
    router.set("/deleteAccess", DeleteAccess);

    return router;

}

module.exports = loadRouterMap;