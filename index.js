//Importar dependencias
const express = require("express");
const cors = require("cors");
const {connection} = require("./database/connection");
require('dotenv').config()
//Mensaje de inicio a la app
console.log("Bienvenido a la api de la marketplace");


//conexión a la base de datos
connection();


//Crear servidor de node
const app = express();
const port = process.env.PORT || 3009;

//Configurar cors
app.use(cors())

//Convertir body a objeto js
app.use(express.json()); //recibir datos con content-type app/json
app.use(express.urlencoded({ extended: true })); //recibiendo datos que vienen por form-urlencoded

//Cargar conf rutas
const productRoutes = require("./routes/product");

app.use("/api/product", productRoutes);



app.listen(port, () =>{
    console.log("servidor arrancado desde puerto",port)
})


