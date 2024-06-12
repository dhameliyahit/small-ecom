const express = require("express");
const getFormDataController = require("../controller/cartController");

const router = express.Router();


router.post("/",getFormDataController)






module.exports = router
