const User = require("../Models/User");
const {uploadToCloudinary} = require("../utils/imageUploader");
const fs  = require("fs");
require("dotenv").config();

function isFileTypeSupported(fileType,supportedTypes) {
    return supportedTypes.includes(fileType);
}

exports.updateProfilePicture = async(req,res) => {
    let tempFilePath;
    try{
        const userId = req.user.id;
        const imageFile = req.files?.imageFile;

        if(!userId) {
            return res.status(400).json({
                success:false,
                message:"Invalid user id."
            })
        }
        const userDetails = await User.findById(userId);
        if(!userDetails) {
            return res.status(400).json({
                success:false,
                message:"Something went wrong."
            })
        }
        if(!imageFile) {
            return res.status(400).json({
                success:false,
                message:"Image not provided."
            })
        }
        const supportedFileTypes = ["jpeg","jpg","png"];
        const imageFileType = imageFile.name.split(".").pop().toLowerCase();
        if(!isFileTypeSupported(imageFileType,supportedFileTypes)) {
            return res.status(400).json({
                success:false,
                message:"File format not supported."
            })
        }
        const filesDir = __dirname + "/files/";
        if (!fs.existsSync(filesDir)) {
            fs.mkdirSync(filesDir);
        }
        tempFilePath = __dirname + "/files/" + Date.now() + `.${imageFile.name.split(".").pop().toLowerCase()}`;
        await new Promise((resolve, reject) => {
            imageFile.mv(tempFilePath, (err) => {
                if (err) {
                    console.error("Error while saving file locally:", err); 
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        const response = await uploadToCloudinary(tempFilePath,process.env.FOLDER_NAME,80,300); // can pass the image quality..

        userDetails.image = response.secure_url;
        await userDetails.save();

        fs.unlinkSync(tempFilePath);
        return res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            imageUrl: userDetails.image,
        });
    }catch(error) {
        console.log(error.message);
        if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }
        return res.status(500).json({
            success:false,
            message:"Can't update your profile pic as of now, try again later."
        })
    }
}