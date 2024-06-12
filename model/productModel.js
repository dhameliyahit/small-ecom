const mongoose = require("mongoose")

// name,description,price

const productSchema = new mongoose.Schema({
    name:{type:String,require:true},
    photo:{data:Buffer,contentType:String},
    description:{type:String,require:true},
    price:{type:Number,require:true},
})

const productModel = mongoose.model("product",productSchema)

module.exports = productModel