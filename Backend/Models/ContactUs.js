const mongoose = require("mongoose");
const contactUsSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true 
    },
    phoneNumber:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    isUserRegistered:{
        type:Boolean,
        default:true
    },
    userId:{
        type:String,
    }
})
module.exports = mongoose.model("ContactUs",contactUsSchema);