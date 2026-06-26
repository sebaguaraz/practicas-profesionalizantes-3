import { createServer } from 'node:http';
import { URL } from 'node:url';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { resolve } from 'node:path';
import { error } from 'node:console';
import { throws } from 'node:assert/strict';

function default_config() {
    const config =
    {
        server:
        {
            ip: '127.0.0.1',
            port: 3000
        },
        database:
        {
            path: './database.db'
        }
    };

    return config;
}

function load_config() {
    let config = null;
    try {
        const data = readFileSync('./config.json', 'utf-8');
        config = JSON.parse(data);
        console.log("Configuracion cargada correctamente.");
    }
    catch (error) {
        console.error("Error cargando config.json. Usando valores por defecto.");
        config = default_config();
    }
    return config;
}

const config = load_config();

function connect_db(path) {
    const dbPath = resolve(path);
    try {
        const db = new DatabaseSync(dbPath);
        return db;
    }
    catch (err) {
        throw new Error("Error al conectar a la base de datos: " + err.message);
    }
}

const db = connect_db(config.database.path);
//const output = await createUser(db, 'test', '123456789');






let userSessions = new Map();  //clave-valor  -> clave: id_user,  valor: sessionObj

class UserSession {
    constructor(username) {
        this.status = 'disabled';
        this.name = username
    }

}


// * HTTP 401
class ErrorAuthentication {
    constructor(object) {
        this.data = object
        this.type = "ErrorAuthentication"
    }

    getError() {
        return this.data
    }
}

// * HTTP 400
class ErrorSpecification {
    constructor(object) {
        this.data = object
        this.type = "ErrorSpecification"
    }

    getError() {
        return this.data
    }
}

// * HTTP 422
class ErrorDomain {
    constructor(object) {
        this.data = object
        this.type = "ErrorDomain"

    }

    getError() {
        return this.data
    }
}

// * HTTP 500
class ErrorInternServer {
    constructor(object) {
        this.data = object
        this.type = "ErrorInternServer"

    }

    getError() {
        return this.data
    }
}

// * valida la autenticacion osea si es quien dice ser, devuelve true o false si existe o no
function authenticate(username, password) {
    const sql = "SELECT * FROM `user` WHERE username=? AND password=?";

    try {
        const stmt = db.prepare(sql);
        const row = stmt.get(username, password);

        return row ? true : false;
    }
    catch (err) {
        throw err;
    }
}

// * Es una validacion intermedia del backend que se ejecuta antes del handler final
// * debe recibir, quien lo quiere hacer? y que quiere hacer?
function authorize(username, path) {

    const sql = `
        SELECT count(*) as total
        FROM access a
        JOIN members m ON a.id_group = m.id_group
        JOIN user u ON m.id_user = u.id
        JOIN endpoint e ON a.id_endpoint = e.id
        WHERE u.username = ? 
        AND e.path = ?
    `;

    try {
        const stmt = db.prepare(sql);
        // Pasamos los parametros en el orden de los signos de interrogaciÃ³n
        const row = stmt.get(username, path);

        // Si el conteo es mayor a 0, tiene permiso
        return row.total > 0;
    } catch (err) {
        console.error("Error consultando permisos:", err);
        throw err;
    }
}



// * delega la autenticacion(osea si es quien dice ser) y crea el objeto SESION si es la 1ra vez q entra u obtiene el objeto SESION si ya lo tiene guardado
function login(username, password) {

    if (!username || !password) {
        const err = new ErrorSpecification({ exception: "FALTAN_PARAMETROS", detail: ["Faltan credenciales de autenticacion"] });

        throw err

    }

    let isAuthenticated = null;

    try {

        isAuthenticated = authenticate(username, password);
        // * si esta autenticado pregunta si tiene una sesion guardada, sino la crea en el momento. Si no esta autenticado sale de la funcion

    } catch (err) {
        const error = new ErrorInternServer({ exception: "ERROR_INTERNO_SERVIDOR", detail: [err.message] })
        throw error;

    }

    if (isAuthenticated) {
        // * si tiene una sesion guardada entra, sino crea una
        let havePreviousSession = userSessions.get(username.trim());

        if (!havePreviousSession) {

            //* Significa que esta ingresando por primera vez. Entonces, creo y persisto el objeto de sesion
            let newSession = new UserSession(username);
            newSession.status = 'enabled';
            userSessions.set(username, newSession);
            return {
                name: newSession.name,
                status: newSession.status,
                session: newSession
            };

        }

        //* Significa que ya ingreso en algun momento y tiene ya un objeto de sesion creado y guardado en el mapa.
        if (havePreviousSession.status == 'disabled') {
            havePreviousSession.status = 'enabled';
        }

        return {
            status: havePreviousSession.status,
            name: havePreviousSession.name,
            session: havePreviousSession
        };

    }
    else {
        const err = new ErrorAuthentication({ exception: "PERMISOS_INVALIDOS", detail: ["Credenciales incorrectas, no autenticado"] });
        throw err
    }




}

function logout(username, password) {

    // * se debe autenticar antes de modificar el estado de la sesion porque sino cualquiera que tenga mi USERNAME puede cerrarme la sesion. EN CAMBIO, necesita mi PASSWORD para hacer LOGOUT
    let isAuthenticated = authenticate(username, password);
    if (!isAuthenticated) {

        const err = new ErrorAuthentication({ exception: "SIN_PERMISOS_PARA_LOGOUT", detail: ["No esta autenticado para hacer logout, debe hacer login"] });
        throw err

    }
    let currentSession = userSessions.get(username);
    if (!currentSession) {

        const err = new ErrorAuthentication({ exception: "SIN_SESION_REGISTRADA ", detail: ["No tiene una sesion registrada, debe autenticarse"] });
        throw err

    }
    currentSession.status = 'disabled';
    return { name: currentSession.name, status: currentSession.status, session: currentSession }

}

// Logica de negocio
async function createUser(db, username, password) {
    const sql = "INSERT INTO user (username, password) VALUES (?, ?) RETURNING id";

    try {
        const stmt = db.prepare(sql);
        const row = stmt.get(username, password);

        return {
            id: row.id,
            username: username,
            password: password
        };

    }
    catch (err) {
        throw err;
    }
}




// * ***************** HANDLERS *******************
function getPrint_handler(request, response) {

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: "ejecutando /Print" }));

}

function getLog_handler(request, response) {

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: "ejecutando /log" }));


}

function getHelp_handler(request, response) {

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: "ejecutando /Help" }));

}

function getsayHello_handler(request, response) {

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: "ejecutando /sayHello" }));

}

function getsayBye_handler(request, response) {

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: "ejecutando /sayBye" }));

}


// Manejadores
async function login_handler(request, response) {

    let body = '';

    request.on('data', chunk => {
        body += chunk.toString();
    });

    request.on('end', async () => {
        try {
            // 3. Convertimos el string a objeto (asumiendo que envi­an JSON)
            const input = JSON.parse(body);
            console.log(input)
            // 4. Procesamos el login
            const output = login(input.username, input.password); //El resultado es un mensaje o un objeto de sesion

            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(output));
        }
        catch (err) {

            let codeStatus = null
            let message = null
            switch (err.type) {
                case "ErrorAuthentication":
                    codeStatus = 401;
                    message = err.getError()
                    break;
                case "ErrorSpecification":
                    codeStatus = 400;
                    message = err.getError()
                    break;
                case "ErrorDomain":
                    codeStatus = 422
                    message = err.getError()
                    break;

                case "ErrorInternServer":
                    codeStatus = 500
                    message = err.getError()
                    break;
            }

            response.writeHead(codeStatus, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(message));
        }
    });


}



function logout_handler(request, response) {

    let body = '';

    request.on('data', chunk => {
        body += chunk.toString();
    });

    request.on('end', async () => {
        try {
            const data = JSON.parse(body)
            console.log(data)
            const { username, password } = data

            const output = logout(username, password)
            response.writeHead(200, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify(output));

        }
        catch (err) {

            let codeStatus = null
            let message = null
            switch (err.type) {
                case "ErrorAuthentication":
                    codeStatus = 401;
                    message = err.getError()

                    break;
                case "ErrorSpecification":
                    codeStatus = 400;
                    message = err.getError()

                    break;
                case "ErrorDomain":
                    codeStatus = 422
                    message = err.getError()

                    break;
                case "ErrorInternServer":
                    codeStatus = 500
                    message = err.getError()
                    break;
            }


            response.writeHead(codeStatus, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(message));

        }
    });


}


async function register_handler(request, response) {

    let body = '';

    request.on('data', chunk => {
        body += chunk.toString();
    });

    request.on('end', async () => {
        try {
            const data = JSON.parse(body);
            console.log(data)
            const { username, password } = data

            if (!username || !password) {
                response.writeHead(400, { 'Content-Type': 'application/json' });
                return response.end(JSON.stringify({
                    exception: "DATOS_INVALIDOS",
                    detail: ["Faltan campos"]
                }));
            }

            const output = await createUser(db, username, password);
            console.log(output)
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ username: output.username }));
        }
        catch (err) {
            response.writeHead(500);
            response.end(JSON.stringify(
                {
                    exception: "ERROR_INTERNO_SERVIDOR",
                    detail: [err.message]
                }

            ));
        }

    });



}

function isPublicPath(path) {
    try {
        const stmtEndpoint = db.prepare(`
            SELECT id_endpoint_status
            FROM endpoint
            WHERE path = ?
            
        `);

        const endpointRow = stmtEndpoint.get(path);

        if (!endpointRow) {
            return false;
        }

        const stmtStatus = db.prepare(`
            SELECT name
            FROM endpoint_status
            WHERE id = ?
            
        `);

        const statusRow = stmtStatus.get(endpointRow.id_endpoint_status);

        if (!statusRow) {
            return false;
        }

        return statusRow.name === 'public';
    }
    catch (err) {
        console.error("Error consultando el estado del endpoint:", err);
        return false;
    }
}


// Ruteo
let router = new Map();
router.set('/Login', login_handler);
router.set('/Logout', logout_handler);
router.set('/Register', register_handler);

router.set("/Print", getPrint_handler)
router.set("/Log", getLog_handler)
router.set("/Help", getHelp_handler)
router.set("/SayHello", getsayHello_handler)
router.set("/SayBye", getsayBye_handler)





async function request_dispatcher(request, response) {

    //* 1. Por cada petición que envía el frontend, el navegador primero, por política de seguridad CORS,
    //*   envía una petición de prueba con METHOD OPTIONS para validar si el backend permite recibir
    //*   peticiones desde otros orígenes.

    //* 2. El backend recibe el OPTIONS y DEBE RESPONDER con:
    //*    - Estado 204 (No Content)
    //*    - Cabeceras CORS indicando qué orígenes, métodos y headers personalizados permite.
    //*    - Hacer RETURN para no ejecutar el resto del código.

    //* 3. El navegador INTERPRETA esa respuesta:
    //*    - Si las cabeceras son correctas (permiten el origen, método y headers) → el navegador
    //*      ENVÍA la petición real (GET, POST, etc.).
    //*    - Si NO son correctas → el navegador BLOQUEA y el frontend recibe error CORS.

    //* 4. En CADA petición real (GET, POST, etc.) que llega al backend, el backend DEBE enviar
    //*    NUEVAMENTE las cabeceras CORS en la respuesta.
    //*    El navegador las interpreta y si son correctas, el frontend recibe los datos.
    //*    Si el backend no envía las cabeceras CORS o no son correctas, el navegador bloquea.
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', "Content-Type, x-api-key, x-api-version");
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

    try {


        if (request.method === 'OPTIONS') {
            response.writeHead(204);
            response.end();
            return;
        }

        if (request.method !== "POST") {
            response.writeHead(400, { "Content-type": "application/json" })
            response.end(JSON.stringify(
                {
                    exception: "METODO_NO_VALIDO",
                    detail: ["Metodo de envio no correspondiente para el servidor."]
                }
            ))
            return
        }


        const url = new URL(request.url, 'http://' + config.server.ip);
        const path = url.pathname;
        const handler = router.get(path);

        const API_VERSION = request.headers['x-api-version'];

        if (API_VERSION != '1.0') {

            response.writeHead(400, { 'Content-Type': 'application/json' })
            return response.end(JSON.stringify(
                {

                    exception: "VERSION_API_INVALIDA",
                    detail: ["Version de API incorrecta"]
                }
            ));
            return;

        }


        if (!handler) {
            response.writeHead(400, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(
                {

                    exception: "RUTA_NO_ENCONTRADA",
                    detail: ["Ruta no encontrada"]
                }
            ));
            return;
        }

        if (isPublicPath(path)) {

            return handler(request, response)
        }


        const username = request.headers["x-api-key"]

        // * debo validar si tiene una sesion REGISTRADA-ACTIVA en el sistema sino debe loguearse de vuelta
        const existSession = userSessions.get(username)
        if (!existSession || existSession.status == "disabled") {
            response.writeHead(401, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify(
                {
                    exception: 'SIN_SESION_REGISTRADA_O_INACTIVA', detail: ['No se encuentra su sesion o esta inactiva, debe loguearse de vuelta']
                }
            ));
            return
        }

        const result = authorize(username, path)
        if (!result) {
            response.writeHead(401, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify(
                {
                    exception: 'NO_AUTORIZADO_PARA_EJECUTAR_ENDPOINT', detail: ['No autorizado para ejecutar ese endpoint']
                }
            ));
            return
        }

        return handler(request, response)


    } catch (error) {

        response.writeHead(500, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(
            {
                exception: 'ERROR_SERVIDOR', detail: [error.message]
            }
        ));

    }




}



function start() {
    console.log('Servidor ejecutandose en http://' + config.server.ip + ':' + config.server.port);
}

let server = createServer(request_dispatcher);
server.listen(config.server.port, config.server.ip, start);
