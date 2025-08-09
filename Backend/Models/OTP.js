const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:5*60
    }
})

async function sendVerificationEmail(email,otp) {
    try{
        const mailResponse = await mailSender(email,`<h2>Don't share this otp with anyone</h2><br/><h1>Verification email from StudyNotion.</h1><br/><p>This OTP will expire in 5 minutes.</p>`,otp);
        console.log("Verification mail sent successfully.",mailResponse);
    }catch(error) {
        console.log("Error occurred while sending Verification email",error.messsage);
        throw error;
    }
}
otpSchema.pre("save",async function(next) {
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports = mongoose.model("OTP",otpSchema);