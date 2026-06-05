Refactorización de arquitectura

Esta versión comenzaremos a efectuar una refactorización a nivel de arquitectura del framework. Varias cuestiones que vamos a comenzar a resolver de cara a la integración final tienen que ver con:

Desacoplamiento frontend-backend
Falta de abstracciones respecto a la gestión de sesión y lógica de control de acceso (autenticador)


Restricción: Trabajar sobre sdk/v3


1. Acoplamiento front-end / back-end

Problema: Actualmente el código muestra que existe un path por convención llamado "/" que se encarga de leer de disco un archivo HTML/CSS/JS y enviárselo al cliente como respuesta. El problema con esto, es que la aplicación cliente existe, porque la genera el servidor. Es decir, "/" es como un método de la API que devuelve una especie de aplicación. Conceptualmente esto es incorrecto. El backend en su estado más fundamental, solo debe implementar una API (WebAPI en nuestro caso) y nada más. Todo aquello que es front-end debería estar completamente por fuera.

Solución: Separar cliente/api hacia un servidor web estático y/o diferencial. En nuestro caso, podemos instalar el servidor HTTP Apache y todo aquello que corresponde con frontend, desarrollarlo dentro de ese servidor directamente ingresando al index.html estándar y/o punto de entrada. Sin embargo, se deben utilizar puertos diferentes. Si el back-end corre en localhost:8080, el front-end debería correr en localhost:8081 y/o cualquier otro puerto habilitado. De esta manera cliente y api quedan disociadas:

Cliente: http://localhost:8081 (Apache)
WebAPI: http://localhost:8080 (NodeJS)

Consigna:

-Aplicar la separación de servidores configurados con puertos diferentes.
-Separar el repositorio en carpetas diferentes (git: sdk/v4/frontend, sdk/v4/backend)
-En el back-end NodeJS. Eliminar la ruta "/"
-Adecuar las peticiones del frontend para que se resuelvan correctamente. Aquí, ocurrirá un error. Como los puertos son diferentes, el dominio web es distinto, con lo cual, las peticiones que se procesan en el backend arrojarán error CORS. (Una política de seguridad del protocolo que impiden que otros dominios consuman servicios de forma cruzada). Para solucionar esto, el backend de NodeJS deberá incluir unas cabeceras HTTP en el manejador principal lo más al inicio posible:

function request_dispatcher(request, response)
{
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (request.method === 'OPTIONS')
    {
        response.writeHead(204);
        response.end();
        return;
    }

    //Resto de código que actualmente funciona...
}



2. Acoplamiento del autenticador y los mecanismos de sesión

Problema: Actualmente el código está presentando acoplamiento sobre la información que necesitan los controles de acceso. Antes, cuando no se autenticaba nada, cualquier función del sistema solo necesitaba tener un cuerpo con sus parámetros en JSON y que el manejador asociado extraiga todo aquello que necesite. La presencia del autenticador, en muchos casos, introduce que todas las peticiones ahora incorporen 2 datos adicionales que no estaban antes (userID y password) y/o nombres similares. Esto, ya produjo una modificación completa de la API. Pero a la vez se viola el principio de responsabilidad única. ¿Porqué si un caso de uso se llama "imprimirReporte" requeriría que sus parámetros fueran userID/password? Para autenticar, claro. Pero el control de acceso es un comportamiento transversal al caso de uso. Por lo tanto, esta transversalidad hay que resolverla para no enchastrar los objetos de datos.

Solución: Uso de cabeceras HTTP. Si bien el cuerpo de una petición POST es ideal para pasar información. Está semánticamente ligada al "path" proporcionado en la URL. Todo aquello que se considera "meta información", es decir, que está por encima o que es transversal y no ligado estrictamente al cuerpo. Se pasa por cabeceras HTTP que es información que se ANEXA a la petición. Ejemplo:

X-User-ID: '12345'
X-API-Key: 'clave_de_acceso'

Con lo cual, la aplicación cliente para efectuar una petición, ahora debería modificar sus fetch() como:

fetch('http://localhost:8080/printDocument&#39;,
{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-User-ID': '12345',              
        'X-API-Key': 'clave_de_acceso'
    },
    body: JSON.stringify({
        documentID: "a7sd82j",
        sheet: "A4"
    })
});

Consigna:
-Modificar las peticiones del frontend de modo tal que pasen siempre esta información por cabeceras y nunca por el cuerpo JSON.
-Modificar el backend para que la lógica de autenticación consuma los datos de las cabeceras y no desde el cuerpo de las peticiones