const { default_handler } = require("../controller/pageController");
const { login_handler, register_handler } = require('../controller/authHandler');

//Mecanismo de ruteo/despacho

function routes(resultConfig, ObjectDB){

    let router = new Map();
    
    // *si creo un callback, esta ejecutando ese callback y dentro del callback se ejecuta el default_handler
    router.set('/', (request, response) => default_handler(request, response, resultConfig));
    router.set('/login', (request, response) => login_handler(request, response, resultConfig));
    router.set('/register', (request, response) => register_handler(request, response, ObjectDB));

    return router;

}

module.exports = routes;