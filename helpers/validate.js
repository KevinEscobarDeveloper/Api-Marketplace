const validator = require('validator')

const validateProduct = (params_producto) =>{
    let validate_title = !validator.isEmpty(params_producto.title) && validator.isLength(params_producto.title, {min: 4, max: undefined});
    if(!validate_title){
        throw new Error("No se ha validado la información");
    }
}

module.exports={
    validateProduct,
}