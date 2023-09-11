require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const router = require("./routes/appRoutes")

const app = express()
const PORT = process.env.PORT || 3001

mongoose.connect(process.env.DB_URL)
.then(()=>console.log("mongo connected"))
.catch((err)=>console.log(err))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(router)
app.get("/",(req,res)=>{
    res.send("he he he")
})





app.listen(PORT,()=>console.log("conntected"))