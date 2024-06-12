const express = require("express")
const dotenv = require("dotenv")
const connectdb = require("./DB/connectdb.js")
const productRoute = require("./route/productRoute.js")
const cartRoute = require("./route/cartRoute.js")

const cors = require("cors")
const app = express()
dotenv.config()
PORT = process.env.PORT || 8000
connectdb(process.env.DB_URL)
app.use(cors())
app.use(express.json())
app.use("/products",productRoute)
app.use("/cart",cartRoute)

app.listen(PORT,()=>{
    console.log(`server is running on Port ${PORT}`)
})