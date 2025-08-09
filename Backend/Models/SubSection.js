const mongoose = require("mongoose");
const subSectionSchema = new mongoose.Schema({
    sectionId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    videoUrl:{
        type:String,
        required:true
    },
})

module.exports = mongoose.model("SubSection",subSectionSchema);