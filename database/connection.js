//Importar dependencias
const mongoose = require("mongoose");


//Crear función de conexión


const connection = async() =>{
    try{
        await mongoose.connect(process.env.Database);



        console.log("Conectado correctamente a la base de datos");
    }catch(e){
        console.log(e);
        throw new Error("Ocurrio un error al conectar la base de datos");
    }
}

module.exports = {
    connection
}