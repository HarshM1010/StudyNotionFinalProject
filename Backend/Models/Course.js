const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
        trim:true
    },
    //specify months/days/years
    courseDuration:{
        value: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            enum: ["days", "weeks", "months", "years"],
            required: true
        }
    },
    //specify the currency in frontend(provide a dropdown to include various currencies..)
    coursePrice:{
        type:Number,
        required:true
    },
    courseDescription:{
        type:String,
        required:true,
        trim:true
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    whatYouWillLearn:{
        type:[String],
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section",
            required:true
        }
    ],
    ratingAndReview:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview",
        }
    ],
    thumbnail:{
        type:String,
    },
    languageUsed:{
        type:String,
        required:true
    },
    studentsEnrolled:[{   // here i added the enrolledAt data....(changed)
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        enrolledAt: {
            type: Date,
            default: Date.now
        }
    }],
    tags:{
        type:[String],
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    }
    ,
    prerequisites:{
        type:[String],
    }
},{
    timestamps:true     //This adds createdAt and updatedAt fields(changed)
})

module.exports = mongoose.model("Course",courseSchema);