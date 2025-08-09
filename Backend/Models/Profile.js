const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
    //common fields...
    firstName:{
        type:String,
        trim:true
    },
    lastName:{
        type:String,
        trim:true
    },
    gender:{
        type:String,
        enum:["male","female","other"],
    },
    about:{
        type:String,
        trim:true
    },
    contactNumber:{
        type:String,
        trim:true
    },
    dateOfBirth:{
        type:Date,
    },
    // links:[

    // ]
    // Student-specific fields
    college:{
        type:String,
    },
    branch:{
        type:String
    },
    passoutYear:{
        type:Date
    },

    // Instructor-specific fields
    experience: {
        type: String, 
    },
    qualifications: {
        type: [String],  
    },
    degree:[
        {
            public_id:{
                type:String
            },
            url:{
                type:String
            }
        }
    ],
    specialization: {
        type: String,  
    }
})

module.exports = mongoose.model("Profile",profileSchema);