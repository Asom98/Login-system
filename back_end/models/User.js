const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user", // Default value is set to "user"
    },
    refreshToken : String
    
})

module.exports = mongoose.model("User", userSchema)