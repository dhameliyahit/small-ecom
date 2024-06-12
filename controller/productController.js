const fs = require("fs");
const productModel = require("../model/productModel.js");

const getProductController = async(req,res)=>{
    try {
        const products = await productModel.find({}).select("-photo")
        res.status(200).send({
            success:true,
            message:"All products get successfully",
            products
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while geting all products",
            error
        })
    }
}

const addProductController = async(req,res)=>{
    try {
        const {name,description,price} = await req.fields;
        const {photo}= await req.files;

        switch(true){
            case !name:
                return res.status(500).send({error: 'name is required'})
            case !description:
                return res.status(500).send({error: 'description is required'})
            case !price:
                return res.status(500).send({error: 'price is required'})
            case photo && photo.size > 1000000:
                return res.status(500).send({error: 'photo is required and less than 1MB'})
        }

        const products = await new productModel({...req.fields})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type

        }

        await products.save()
        res.status(201).send({
            success:true,
            message:'Product created Successfully',
            products
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while create product'
        })
    }
}

//get single product controller
const getSingleProductController = async(req,res)=>{
    try {
        const {pid} = req.params
        const product = await productModel.findById(pid).select("-photo")
        res.status(200).send({
            success:true,
            message:"Product get succesfully",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while getting single product"
        })
    }
}


// get product photo

const productPhotoController = async(req,res) =>{
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if(product.photo.data){
            res.set('Content-type',product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while get product photo',
            error
        })
    }
}




module.exports ={
    getProductController,
    addProductController,
    productPhotoController,
    getSingleProductController
}