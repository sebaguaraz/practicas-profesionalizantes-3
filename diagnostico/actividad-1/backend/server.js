const express = require("express");
const materialsRoutes = require("./routers/materialsRouter");
const app = express();

const path = require("path");
// * el servidor utiliza express.static() para servir todos los archivos que estan en la carpeta frontend desde si mismo al navegador cuando ni bien entra a localhost:3000 o hacen una peticion.
// * Cuando tu JS hace el fetch('/api/datos'), le está hablando al mismo servidor que le dio los archivos hace un segundo.
app.use(express.static(path.join(__dirname,`../frontend`)));

// * Lo que hace express.json(): Express crea el objeto req al instante cuando hay una peticion que pega en el servidor. Cuando llega a esta linea crea ".body" y la llena con la informacion q viene en el body del lado del cliente, lo "parsea" (lo traduce) y lo convierte en un Objeto de JavaScript. Lo guarda en req.body y express me pasa ese objeto req con req.body a mi funcion (req, res) => {...}
app.use(express.json());

app.get("/api/ping", (req, res)=>{
    res.json({message: "pong"});
});
// internamente use() le pasa los objetos req y res q ya creo y se los pasa al objeto ROUTER al invocarlo internamente.
app.use("/api", materialsRoutes);

const puerto = 3000;

function init(){
    console.log(`Servidor escuchando en puerto http://localhost:${puerto}`)
}
// el servidor escucha si alguna peticion pega en el.
app.listen(puerto, init);



// ************* QUE ES API **************
// *la api seria el conjunto de acciones q brinda al exterior, como devuelve los datos, que parametros debe recibir, el estado que devuelve, el formato en el que recibe los dato del exterior*