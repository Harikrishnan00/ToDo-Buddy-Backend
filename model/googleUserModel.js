const mongoose = require("mongoose")

const googleUserSchema = mongoose.Schema({
    email:String,
    googleID:String
})

const GoogleUser = mongoose.model("googleuser", googleUserSchema)

module.exports = GoogleUser
