//importart librerias 
const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const multer = require("multer");


//generamos nuestro espacio de almacenamiento local
const localStorge = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./images/products');
    },
    filename: function(req,file,cb){
        cb(null,"product"+Date.now()+file.originalname);
    }
}) 


const uploaded = multer({storage: localStorge});


router.get("/products", productController.list);
router.post("/create-product", productController.create);
router.post("/image/:id",[uploaded.single("file0")], productController.uploadImage);
router.get("/get-image/:image",productController.getImage);

module.exports = router;