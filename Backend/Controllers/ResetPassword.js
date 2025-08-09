const User = require("../Models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

//to make sure that a user who is logged in cannot open the link we should handel it through frontend route protection....

exports.forgotPassword = async(req,res) => {
    try{
        const {email} = req.body;
        const user = await User.findOne({email:email});
        if(!user) {
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        const token = crypto.randomUUID(); // will generate random strings.
        let hashedToken;
        try{
            hashedToken = await bcrypt.hash(token,10);
        }catch(error) {
            return res.status(400).json({
                success:false,
                message:"Error while hashing token."
            });
        }
        user.token = hashedToken;
        user.tokenExpires = Date.now() + 5*60*1000;
        await user.save();
        // create the url of reset password
        const url = `http://localhost:5173/reset-password/${token}`;
        await mailSender(email,"Reset Password Link",`Password Reset Link: ${url} <br/> <p>This link will expire in 5 minutes.Do not share this link with anyone.</p>`);
        return res.status(200).json({
            success:true,
            message:"Email sent successfully to reset the password.",
            url
        })
    }catch(error) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:"Somthing went wrong while sending the reset password email."
        })
    }
}

exports.resetPassword = async(req,res) => {
    try{
        const {newPassword,confirmPassword,token} = req.body;
        if(!newPassword || !confirmPassword || !token) {
            return res.status(400).json({
                success:false,
                message:"Please fill all the details carefully."
            })
        }
        if(newPassword !== confirmPassword) {
            return res.status(400).json({
                success:false,
                message:"Passwords didn't match"
            })
        }
        const users = await User.find({
            token : {$ne : null},   // here ne = not equal
            tokenExpires : {$gt : Date.now()}   // here gt = greater than
        });
        let matchedUser = null;
        let matchedUserEmail = null;
        for(let user of users) {
            const userDetails = await User.findById(user);
            if(!userDetails) {
                return res.status(500).json({
                    success:false,
                    message:"Something went wrong while Checking for users, please try resetting password after a while."
                })
            }
            const isMatch = await bcrypt.compare(token,userDetails.token);
            if(isMatch) {
                matchedUser = user;
                matchedUserEmail = userDetails.email;
                break;
            }
        }
        if(!matchedUser) {
            return res.status(400).json({ success: false, message: 'Invalid or expired token' });
        }
        //we have found the user    
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(newPassword,10); // 10 here is number of rounds
        }
        catch(error){
            res.status(500).json({
                success:false,
                message:"Error in hashing password"
            })
        }
        matchedUser.password = hashedPassword;
        matchedUser.token = undefined;
        matchedUser.tokenExpires = undefined;
        await matchedUser.save();
        await mailSender(matchedUserEmail,"Password Changed successfully",`<p>Your Password has been changed successfully. <br/>You can now Login to continue.</p>`);
        return res.status(200).json({
            success:true,
            message:"Password has been reset successfully.",
            matchedUserEmail
        })
        //after reset password success user must be redirected to login page...
        
    }catch(error) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:"Something went wrong while resetting the password. Try again after a while."
        })
    }
} 