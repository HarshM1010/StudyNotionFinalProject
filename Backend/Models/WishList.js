const mongoose = require("mongoose");
const wishListSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("wishList",wishListSchema);