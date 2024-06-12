const express = require("express")
const { getProductController, addProductController, productPhotoController, getSingleProductController } = require("../controller/productController")
const formidable = require("express-formidable")
const router = express.Router()

// get all products
router.get("/",getProductController)


//add - new product
router.post("/add-Product",formidable(),addProductController)

//get single-product
router.get("/single-product/:pid",getSingleProductController)



//get product photo
router.get("/product-photo/:pid",productPhotoController)


module.exports  = router