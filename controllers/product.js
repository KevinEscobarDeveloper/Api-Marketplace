const Product = require("../models/product")
const {validateProduct} = require("../helpers/validate");
const fs = require("fs");
const path = require('path')

//Acciones de prueba
const testProduct = (req,res) =>{
    return res.status(200).send({
        message: "Petición a productos correcta",
        status: "success"
    })
    
}


//función crear
const create = (req,res) =>{
    //recorger los parametros por post a guardar
    const params_body = req.body;
    console.log(params_body);

    try{
        validateProduct(params_body);
    }catch(e){
            return res.status(400).send({
                message: "Los datos no cumplen con requisitos minimos",
                status: "error",
            });
    }

    //crear producto a guardar
    const product = new Product(params_body);

    //Guardar articulos en la base de datos
    product.save((error,productSaved) =>{
        if(error || !productSaved){
            return res.status(400).json({
                message: "Ha ocurrido un error al guardar",
                status: "error",
                error: error
            });
        }

        return res.status(200).json({
            status: "success",
            product: productSaved,
            message: "Producto guardado con exito"
        })
    });
}


const list = (req,res) =>{
    let query = Product.find({});

    query.sort({title:1}).exec((error,products) =>{
        if(error || !products){
            return res.status(404).send({
                message: "No se han encontrado productos",
                status: "error"
            });
        }

        return res.status(200).send({
            status: "success",
            products,
        })
    })
    
}

const uploadImage = (req,res) =>{
    console.log("dentro");
    
    //recogemos el fichero de imagen subido
    if(!req.file && !req.files){
        return res.status(404).send({
            status: "error",
            message: "invalid petition"
        });
    }

    //nombre del archivo
    let archivo = req.file.originalname;

    //extensión del archivo
    let archivo_split = archivo.split(".");
    
    //guardamos la extensión que se encuentra en la posición 1 del arreglo
    let extension = archivo_split[1];

    //comprobar extensión correcta
    if (
        extension != "png" &&
        extension != "jpg" &&
        extension != "jpeg" &&
        extension != "gif"
      ){
        fs.unlink(req.file.path,(error)=>{
            return res.status(400).json({
                status: "error",
                message: "invalid file"
            });
        });
      }else{
        //recoger el id del producto
        let id = req.params.id;


        //encontrar y actualizar el producto
        Product.findOneAndUpdate(
            {_id: id},
            {image: req.file.filename},
            {new: true},
            (error,product_updated) => {
                if(error || !product_updated) {
                    return res.stauts(500).send({
                        status: "Error",
                        message: "Error to update the product ",
                    });
                }

                return res.status(200).send({
                    status: "success",
                    products: product_updated,
                    file: req.file
                });
            }
        );
      }

}


const getImage = (req,res) =>{
    let image = req.params.image;
    let path_route = "./images/products/"+image;

    fs.stat(path_route, (error, exist) =>{
        if(exist){
            return res.sendFile(path.resolve(path_route));
        } else{
            return res.status(404).json({
                status: "error",
                message: "The image doesn't exist"
            });
        }
    })
}


//Exportar acciones

module.exports ={
    testProduct,
    create,
    list,
    uploadImage,
    getImage
}