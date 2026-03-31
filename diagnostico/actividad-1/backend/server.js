const express = require("express");
const materialsRoutes = require("../backend/routers/materialsRouter");
const app = express();

// Lo que hace express.json(): Agarra ese texto, lo "parsea" (lo traduce) y lo convierte en un Objeto de JavaScript.
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

app.listen(puerto, init);



// ************* QUE ES API **************
// *la api seria el conjunto de acciones q brinda al exterior, como devuelve los datos, que parametros debe recibir, el estado que devuelve, el formato en el que recibe los dato del exterior*