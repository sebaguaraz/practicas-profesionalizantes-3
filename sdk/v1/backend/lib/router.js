const { default_handler } = require("../controller/pageController");
const { login_handler, register_handler } = require('../controller/authHandler');

//Mecanismo de ruteo/despacho

function route() {

    let router = new Map();

    
    // * Guardo una función anónima que, al ejecutarse en el dispatcher, llama a default_handler
    // * pasando request, response y resultConfig.
    router.set('/', (request, response) => default_handler(request, response));
    router.set('/login', (request, response) => login_handler(request, response));
    router.set('/register', (request, response) => register_handler(request, response));

    return router;

}

module.exports = route;