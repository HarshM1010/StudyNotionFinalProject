const User = require("../Models/User");
const OTP = require("../Models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require('bcrypt');
const Profile = require("../Models/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Send otp....
exports.sendOTP = async(req,res) => {
    try{
        const {email} = req.body;
        if(!email) {
            return res.status(400).json({
                success:false,
                message:"Fill all the details carefully"
            })
        }
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(409).json({
                success:false,
                message:"This email id already exists"
            })
        }

        //generate an otp
        let options = {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        }
        let otp = otpGenerator.generate(6,options);
        //otp must be unique(atleast unique from those which currently are stored in db)
        let uniqueOTP = await OTP.findOne({otp:otp});
        while(uniqueOTP !== null) {
            otp = otpGenerator.generate(6,options);
            uniqueOTP = await OTP.findOne({otp:otp});
        } 
        //save otp in db 
        const saveOTP = await OTP.create({email,otp});
        res.status(200).json({
            success:true,
            message:"Otp sent successfully",
            otp:otp
        })

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//signup
exports.signup = async(req,res) => {
    try{    
        const {email,firstName,lastName,accountType="Student",contactNumber="",password,confirmPassword,otp} = req.body;
        console.log(otp);
        //validate
        if(!email || !firstName || !lastName || !password || !confirmPassword || !otp) {
            return res.status(400).json({
                success:false,
                message:"Please enter all the details carefully."
            })
        }
        //check if the user already exists 
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(409).json({
                success:false,
                message:"This email id already exists"
            })
        }
        //match the passwords..
        if(password !== confirmPassword) {
            return res.status(401).json({
                success:false,
                message:"Password not matching"
            })
        }
        const recentOTP = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOTP );
        const newestOtp = recentOTP?.[0]?.otp;
        if(newestOtp !== otp) {
            return res.status(401).json({
                success:false,
                message:"otp didn't match,please enter a valid otp"
            })
        }
        
        //secure the password...
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password,10); // 10 here is number of rounds
        }
        catch(error){
            res.status(500).json({
                success:false,
                message:"Error in hashing password"
            })
        }
        // const profileDetails = await Profile.create({
        //     gender:null,
        //     dateOfBirth:null,
        //     about:null,
        //     contactNumber:null,
        //     ...(accountType === "Student" && {
        //         college:null,
        //         branch:null,
        //         passoutYear:null
        //     }),
        //     ...(accountType === "Instructor" && {
        //         experience:null,
        //         qualification:null,
        //         degree:[null],
        //         specialization:null
        //     })
        // });

        //still we are getting qualifications and degree in student profile in db..
        const profileData = {
            firstName:null,
            lastName:null,
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        };

        if (accountType === "Student") {
            profileData.college = null;
            profileData.branch = null;
            profileData.passoutYear = null;
        }

        if (accountType === "Instructor") {
            profileData.experience = null;
            profileData.qualifications = null;
            profileData.degree = [];
            profileData.specialization = null;
        }

        const profileDetails = await Profile.create(profileData);
        
        const user = await User.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            contactNumber:contactNumber,
            accountType:accountType,
            password:hashedPassword,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`
        })
        return res.status(200).json({
            success:true,
            message:"User is registered successfully"
        })
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered, please try again"
        })
    }   
}

//login
exports.login = async(req,res) => {
    try{
        const{password,email} = req.body;
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:"Please enter all the details carefully."
            })
        }
        const existingUser = await User.findOne({email});
        if(!existingUser) {
            return res.status(409).json({
                success:false,
                message:"Please signup to login."
            })
        }
        if(await bcrypt.compare(password,existingUser.password)) {
            const payload = {
                email:existingUser.email,
                id:existingUser._id,
                accountType:existingUser.accountType
            }
            //change the expiry time of token...
            const token = jwt.sign(payload,process.env.JWT_SECRET,{ expiresIn:"9h",issuer:"studynotion" });
            const userObj = existingUser.toObject();
            userObj.token = token;
            userObj.password = undefined;
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000), //expires in 3 days...
                httpOnly:true,
                secure: process.env.NODE_ENV === 'production', // HTTPS in production
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' // Allow cross-domain
            };
            console.log(token);
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                userObj,
                message:"user logged in successfully."
            })
        }
        else {
            return res.status(403).json({
                success:false,
                message:"Password is Incorrect."
            })
        }
    }catch(error) {
        console.error("Could not log in.");
        res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}

//changepassword
exports.changePassword = async(req,res) => {
    try{
        const userId = req.user.id;
        const {oldPassword,newPassword,confirmPassword} = req.body;
        if(!oldPassword || !newPassword || !confirmPassword || !userId) {
            return res.status(400).json({
                success:false,
                message:"Please enter all the details carefully."
            })
        }
        if(newPassword !== confirmPassword) {
            return res.status(400).json({
                success:false,
                message:"Please check newPassword and confirmPassword carefully."
            })
        }
        const user = await User.findById(userId).populate("additionalDetails").exec();
        if(!user) {
            return res.status(400).json({
                success:false,
                message:"User can't be found."
            })
        }

        if(!(await bcrypt.compare(oldPassword,user.password))) {
            return res.status(400).json({
                success:false,
                message:"OldPassword doesn't match!",
            })
        }
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
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({
            success:true,
            message:"Password updated successfully.",
            user
        })
    }catch(error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error while updating the password, try again after a while."
        })
    }
}