const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        enum:["Admin","Student","Instructor"],
        required:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
        required:true
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    image:{
        type:String,
        required:true
    },
    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress"
        }
    ],
    token:{  // every user will have their own unique token and expration time which can be used to reset the password...
        type:String
    },
    tokenExpires:{
        type:Date
    },
    deletionRequestedAt: { type: Date, default: null },
    isDeletionRequested: { type: Boolean, default: false },
    deleteCourses: { type: Boolean, default: false },        //option given to instructors whether to delete their courses or not...
})

module.exports = mongoose.model("User",userSchema);