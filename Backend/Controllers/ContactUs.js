const User = require("../Models/User");
const ContactUs = require("../Models/ContactUs");
const mailSender = require("../utils/mailSender");
require("dotenv").config();

exports.contactUs = async(req,res) => {
    try{
        const {firstName,lastName,email,phoneNumber,message,userId} = req.body;
        if(!firstName || !lastName || !email || !phoneNumber || !message) {
            return res.status(400).json({
                success:false,
                message:"Please fill all the details carefully."
            })
        }
        const newQuery = await ContactUs.create({
            firstName,lastName,message,email,phoneNumber
        })
        const contactUsDetails = await ContactUs.findById(newQuery._id);
        if(!userId) {
            contactUsDetails.isUserRegistered = false;
            contactUsDetails.userId = undefined;
        }
        else {
            contactUsDetails.isUserRegistered = true;
            contactUsDetails.userId = userId;
        }
        await contactUsDetails.save();
        //first mail studynotion and then mail to user.
        await mailSender(process.env.MAIL_USER,`Mail regardinng contact with StudyNotion from a ${(userId ? "Registered User" : "New User")}`,message);
        await mailSender(email,"Thanks for Contacting us",`<h1>Hi ${firstName} ${lastName}</h1> <br/> <p>We have received your message. Our team will contact you very soon.</p> <br/> <p>Thanks for contacting us.</p> <br/> <p>StudyNotion</p>`);
        
        return res.status(200).json({
            success:true,
            message:"Contact mail received successfully."
        })
    }catch(error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while fetching data.Please contact us again after a while."
        })
    }
}