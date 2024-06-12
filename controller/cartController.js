const cartModel = require("../model/cartModel")
const Joi = require('joi');

const getFormDataController = async(req,res)=>{
    
    try {
        const {fname,lname,address,email,contactNo} = req.body
        
        const Schema = Joi.object({
            fname: Joi.string().min(3).required(),
            lname:Joi.string().min(3).required(),
            address:Joi.string().required(),
            email: Joi.string().email({ tlds: { allow: false } }),
            contactNo: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        })
       const result =  Schema.validate(req.body)
        if(result.error){
            res.status(400).send(result.error.details[0])
        }else{
            const data = cartModel({...req.body})
     
            data.save()
             res.status(200).send({
                 success:true,
                 message:"you request has been send..",
                 result
             })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while send request",
            error
        })
    }
}
module.exports = getFormDataController