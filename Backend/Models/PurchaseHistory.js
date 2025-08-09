const mongoose = require("mongoose");
const purchaseHistorySchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }, 
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true,
    },
    purchasedAt:{
        type:Date,
        default:Date.now,
    },
    coursePrice:{
        type:Number,
        required:true,
    },
    //we can add transaction id and status of the course such as paid or refunded of failed payment...
})

module.exports = mongoose.model("purchaseHistory",purchaseHistorySchema);