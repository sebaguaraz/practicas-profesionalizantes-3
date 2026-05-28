import { createServer } from 'node:http';
import { URL } from 'node:url';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { resolve } from 'node:path';

function default_config() {
    const config =
    {
        server:
        {
            ip: '127.0.0.1',
            port: 3000,
            default_path: './index.html'
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
        console.log("ConfiguraciÃ³n cargada correctamente.");
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
        // Pasamos los parÃ¡metros en el orden de los signos de interrogaciÃ³n
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
        return { status: 400, error: "campos vacios, son obligatorios" }
    }

    try {

        const isAuthenticated = authenticate(username, password);
        // * si esta autenticado pregunta si tiene una sesion guardada, sino la crea en el momento. Si no esta autenticado sale de la funcion

        if (isAuthenticated) {
            // * si tiene una sesion guardada entra, sino crea una
            let havePreviousSession = userSessions.get(username.trim());

            if (!havePreviousSession) {

                //* Significa que esta ingresando por primera vez. Entonces, creo y persisto el objeto de sesiÃ³n
                let newSession = new UserSession(username);
                newSession.status = 'enabled';
                userSessions.set(username, newSession);
                return {
                    status: 200,
                    message: `${newSession.name} se creo su sesion por 1ra vez, status: ${newSession.status}`,
                    session: newSession
                };

            }

            //* Significa que ya ingreso en algun momento y tiene ya un objeto de sesion creado y guardado en el mapa.
            if (havePreviousSession.status == 'disabled') {
                havePreviousSession.status = 'enabled';
            }

            return {
                status: 200,
                message: `${havePreviousSession.name} se obtuvo su sesion anterior, status: ${havePreviousSession.status}`,
                session: havePreviousSession
            };

        }
        else {
            return { status: 401, error: "Credenciales incorrectas, no autenticado" };
        }



    } catch (err) {
        return { status: 500, error: err.message }
    }

}

function logout(username, password) {

    // * se debe autenticar antes de modificar el estado de la sesion porque sino cualquiera que tenga mi USERNAME puede cerrarme la sesion. EN CAMBIO, necesita mi PASSWORD para hacer LOGOUT
    let isAuthenticated = authenticate(username, password);
    if (!isAuthenticated) {
        return { status: 400, message: "No esta autenticado para hacer logout, debe hacer login" }
    }
    let currentSession = userSessions.get(username);
    if (!currentSession) {
        return { status: 400, message: "No tiene una sesion registrada, debe autenticarse" }
    }
    currentSession.status = 'disabled';
    return { status: 200, message: "Usted ha cerrado la sesion" }

}

// Logica de negocio
async function createUser(db, username, password) {
    const sql = "INSERT INTO user (username, password) VALUES (?, ?) RETURNING id";

    try {
        const stmt = db.prepare(sql);
        const row = stmt.get(username, password);

        const result =
        {
            id: row.id,
            username: username,
            password: password
        };

        return result;
    }
    catch (err) {
        throw err;
    }
}




// * ***************** HANDLERS *******************
function getPrint_handler(request, response) {

    if (request.method === "GET") {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ status: 200, message: "ejecutando /Print" }));

    }

}

function getLog_handler(request, response) {

    if (request.method === "GET") {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ status: 200, message: "ejecutando /log" }));

    }

}

function getHelp_handler(request, response) {

    if (request.method === "GET") {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ status: 200, message: "ejecutando /Help" }));

    }

}

function getsayHello_handler(request, response) {

    if (request.method === "GET") {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ status: 200, message: "ejecutando /sayHello" }));

    }

}

function getsayBye_handler(request, response) {

    if (request.method === "GET") {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ status: 200, message: "ejecutando /sayBye" }));

    }

}


function default_handler(request, response) {
    try {
        const html = readFileSync(config.server.default_path, 'utf-8');
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(html);
    }
    catch (error) {
        response.writeHead(500);
        response.end('Error interno: No se pudo cargar la vista principal.');
    }
}

// Manejadores
async function login_handler(request, response) {

    if (request.method == "POST") {
        let body = '';

        request.on('data', chunk => {
            body += chunk.toString();
        });

        request.on('end', async () => {
            try {
                // 3. Convertimos el string a objeto (asumiendo que envÃ­an JSON)
                const input = JSON.parse(body);

                // 4. Procesamos el login
                const output = login(input.username, input.password); //El resultado es un mensaje o un objeto de sesion

                response.writeHead(output.status, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(output));
            }
            catch (err) {
                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: 'Formato JSON invÃ¡lido' }));
            }
        });
    }
    else {
        response.writeHead(405, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'MÃ©todo no permitido. Usa POST.' }));
        return;
    }


}


function logout_handler(request, response) {
    if (request.method == "POST") {
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
                response.writeHead(output.status, { 'Content-Type': 'application/json' })
                response.end(JSON.stringify(output));

            }
            catch (err) {
                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: err.message }));
            }
        });
    }

}


async function register_handler(request, response) {
    //Caso GET
    const url = new URL(request.url, 'http://' + config.server.ip);
    const input = Object.fromEntries(url.searchParams);

    try {
        const output = await createUser(db, 'test', '123456789');

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(output));
    }
    catch (err) {
        response.writeHead(500);
        response.end(JSON.stringify({ error: err.message }));
    }
}


async function getUser_handler(request, response) {
    //Caso GET
    if (request.method === "GET") {

        const url = new URL(request.url, 'http://' + config.server.ip);
        const input = Object.fromEntries(url.searchParams);

        let username = input.username

        let havePreviousSession = userSessions.get(username.trim());

        try {

            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(havePreviousSession));
        }
        catch (err) {
            response.writeHead(500);
            response.end(JSON.stringify({ error: err.message }));
        }


    }
}

// Ruteo
let router = new Map();
router.set('/', default_handler);
router.set('/login', login_handler);
router.set('/logout', logout_handler);
router.set('/register', register_handler);
router.set("/getUser", getUser_handler);


router.set("/print", getPrint_handler)
router.set("/log", getLog_handler)
router.set("/help", getHelp_handler)
router.set("/sayHello", getsayHello_handler)
router.set("/sayBye", getsayBye_handler)

async function request_dispatcher(request, response) {
    const url = new URL(request.url, 'http://' + config.server.ip);
    const path = url.pathname;
    const handler = router.get(path);


    if (!handler) {
        response.writeHead(400);
        response.end("Ruta no encontrada");
        return;
    }

    const listProtected = ["/print", "/log", "/help", "/sayHello", "/sayBye"]

    if (!listProtected.includes(path)) {
        return handler(request, response)
    }

    const data = Object.fromEntries(url.searchParams);
    console.log(data)

    let { username } = data

    // * debo validar si tiene una sesion REGISTRADA-ACTIVA en el sistema sino debe loguearse de vuelta
    const existSession = userSessions.get(username)
    if (!existSession || existSession.status == "disabled") {
        response.writeHead(400, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ error: 'No se encuentra su sesion o esta inactiva, debe loguearse de vuelta' }));
        return
    }

    const result = authorize(username, path)
    if (!result) {
        response.writeHead(400, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ error: 'No autorizado para ejecutar ese endpoint' }));
        return
    }

    return handler(request, response)








}

function start() {
    console.log('Servidor ejecutandose en http://' + config.server.ip + ':' + config.server.port);
}

let server = createServer(request_dispatcher);
server.listen(config.server.port, config.server.ip, start);