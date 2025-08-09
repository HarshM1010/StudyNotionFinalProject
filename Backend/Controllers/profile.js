const Profile = require("../Models/Profile");
const User = require("../Models/User");
const {uploadToCloudinary} = require("../utils/imageUploader");
const fs = require("fs");
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

function isFileTypeSupported(fileType,supportedTypes) {
    return supportedTypes.includes(fileType);
}

exports.createProfile = async(req,res) => {
    //this can be used to update the profile too...
    let tempFilePath;
    try{
        const userId = req.user.id;
        const accountType = req.user.accountType;
        let {
            
            lastName="",
            gender="",
            about="",
            dateOfBirth="",
            contactNumber="",
            firstName="",

            college="",
            branch="",
            passoutYear="",

            experience="",
            qualifications="",
            specialization="",

        } = req.body || {};

        const degreeFile = req.files?.degreePdf || null;
        if(!userId) {
            return res.status(400).json({
                success:false,
                message:"User ID is missing. Please authenticate again."
            })
        }
        const userDetails = await User.findById(userId);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }
        userDetails.firstName = firstName;
        userDetails.lastName = lastName;
        await userDetails.save();
        // accountType  = userDetails.accountType;
        const profileId = userDetails.additionalDetails;
        if (!profileId) {
            return res.status(404).json({
                success: false,
                message: "Profile not found."
            });
        }
        let response = null;
        if(accountType === "Instructor" && degreeFile !== null) {
            const allowedTypes = ["pdf"];
            const degreeType = degreeFile.name.split(".").pop().toLowerCase();
            
            if(!isFileTypeSupported(degreeType,allowedTypes)) {
                return res.status(400).json({
                    success:false,
                    message:"File format not supported."
                })
            }
            if (degreeFile.mimetype !== "application/pdf") {
                return res.status(400).json({
                    success: false,
                    message: "Invalid file type. Only PDFs are allowed.",
                });
            }
            if (degreeFile.size > MAX_SIZE) {
                return res.status(400).json({
                    success: false,
                    message: "PDF is too large. Max allowed size is 5MB.",
                });
            }
            const filesDir = __dirname + "/files/";
            if (!fs.existsSync(filesDir)) {
                fs.mkdirSync(filesDir);
            }
            tempFilePath = __dirname + "/files/" + Date.now() + `.${degreeFile.name.split(".").pop().toLowerCase()}`;
            await new Promise((resolve, reject) => {
                degreeFile.mv(tempFilePath, (err) => {
                    if (err) {
                        console.error("Error while saving file locally:", err); 
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            response = await uploadToCloudinary(tempFilePath,process.env.FOLDER_NAME); 
            const profileDetails = await Profile.findById(profileId);
            if (!profileDetails) {
                return res.status(404).json({
                    success: false,
                    message: "Profile not found for the user."
                });
            }
            if (!Array.isArray(profileDetails.degree)) {
                profileDetails.degree = [];
                profileDetails.degree.push({
                    public_id: response.public_id,
                    url: response.secure_url
                });
            }
            
            await profileDetails.save();
            fs.unlinkSync(tempFilePath);
        }

        const profileDetails = await Profile.findByIdAndUpdate(
            profileId,
            {
                firstName,
                lastName,
                gender,
                about,
                contactNumber,
                dateOfBirth,
                ...(accountType === "Student" && {college,branch,passoutYear}),
                ...(accountType === "Instructor" && {experience,qualifications,specialization}),
            },
            {new:true}
        )

        return res.status(200).json({
            success:true,
            message:"Profile details updated successfully",
            userDetails,
            profileDetails
        })
    }catch(error){
        console.log(error.message);
        if(fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }
        return res.status(500).json({
            success:false,
            message:"Internal server error.",
            error:error.message
        })
    }   
}

exports.deleteAccount = async(req,res) => {
    //learnt how to schedule a task...
    try{
        const userId = req.user.id;
        let {deleteCourses = "false"} = req.body || {};  // will ask instructor whether he wants to delete his courses or not...
        if(!userId) {
            return res.status(400).json({
                success:false,
                message:"Something went wrong while searching for user."
            })
        }
        const userDetails = await User.findById(userId);
        if(!userDetails) {
            return res.status(400).json({
                success:false,
                message:"Something went wrong.",
                error:error.message
            })
        }
        //once requested for deletion, user then can't make a request again.
        if(userDetails.isDeletionRequested === true) {
            const isoTime = userDetails.deletionRequestedAt;
            const date = new Date(isoTime);
            const readable = date.toLocaleString('en-IN',{
                timeZone:'Asia/kolkata',
                dateStyle:'full',
                timeStyle:'medium'
            })
            return res.status(400).json({
                success:false,
                message:`Your deletion request has been already registered at ${readable} and is in progress.`
            })
        }
        userDetails.isDeletionRequested = true;
        userDetails.deletionRequestedAt = new Date();
        userDetails.deleteCourses = deleteCourses;
        await userDetails.save();
        return res.status(200).json({
            success:true,
            message:"Your account will get deleted within three days."
        })
    }catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Internal server error. Try deleting account after a while.",
            error:error.message
        })
    }
}

exports.getAllUserDetails = async(req,res) => {
    try{
        const userId = req.user.id;
        if(!userId) {
            return res.status(400).json({
                success:false,
                message:"Something went wrong"
            })
        }
        const userDetails = await User.findById(userId).populate("additionalDetails").populate("courses").exec();
        return res.status(200).json({
            success:true,
            message:"User details are being fetched successfully.",
            userDetails
        })
    }catch(error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while fetching the data of the user.."
        })
    }
}