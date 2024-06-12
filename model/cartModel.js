const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    fname:
    {
        type:String,
        require:true
    },
    lname:
    {
        type:String,
        require:true
    },
    address:
    {
        type:String,
        require:true
    },
    email:
    {
        type:String,
        require:true
    },
    contactNo:
    {
        type:String,
        require:true
    },
})

const cartModel = mongoose.model("cart",cartSchema)

module.exports = cartModel