const mongoose = require("mongoose");
const sectionSchema = new mongoose.Schema({
    courseId:{
        type:String,
        required:true
    },
    sectionName:{
        type:String,
        required:true
    },
    subSection:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"SubSection"
        }
    ]
})

module.exports = mongoose.model("Section",sectionSchema);