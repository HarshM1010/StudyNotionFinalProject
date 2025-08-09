const SubSection = require("../Models/SubSection");
const Section = require("../Models/Section");
const {uploadToCloudinary} = require("../utils/imageUploader");
const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();

//after the completion of the project add a functionality where a user can directly send the videourl 
function isVideoFormatSupported(videoFormat,supportedFormats) {
    return supportedFormats.includes(videoFormat);
}
exports.createSubSection = async(req,res) => {
    let tempFilePath = "";
    try{
        const {sectionId,title,description} = req.body;
        const videoFolder = req.files?.videoFile;
        if(!sectionId || !title || !description) {
            return res.status(400).json({
                success:false,
                message:"Please fill all the details carefully."
            })
        }
        if(!videoFolder) {
            return res.status(400).json({
                success:false,
                message:"Couldn't able to extract the video file."  
            })
        }
        const supportedFormats = ["mp4", "webm", "ogg", "mov"];
        const videoFormat = videoFolder.name.split(".").pop().toLowerCase();
        if(!isVideoFormatSupported(videoFormat,supportedFormats)) {
            return res.status(400).json({
                success:false,
                message:"Video format not supported."
            })
        }
        const filesDir = __dirname + "/files/";
        if (!fs.existsSync(filesDir)) {
            fs.mkdirSync(filesDir);
        }
        tempFilePath = __dirname + "/files/" + Date.now() + `.${videoFolder.name.split(".").pop().toLowerCase()}`;
        
        await new Promise((resolve,reject) => {
            videoFolder.mv(tempFilePath,(err) => {
                if(err) {
                    console.error("Error while saving file locally:", err); 
                    reject(err);
                } else {
                    resolve();
                }
            })
        });
        const videoUpload = await uploadToCloudinary(tempFilePath,process.env.FOLDER_NAME);
        const SubSectionDetails = await SubSection.create({
            sectionId,
            title:title,
            videoUrl:videoUpload.secure_url,
            description:description,
        })
        fs.unlinkSync(tempFilePath);
        const updateSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $push:{
                    subSection:SubSectionDetails._id,
                }
            },
            {new:true}
        )
        return res.status(200).json({
            success:true,
            message:"SubSection created successfully.",
            updateSection,
        })
    }catch(error) {
        console.log(error.message);
        if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}

exports.updateSubSection = async(req,res) => {
    let tempFilePath = "";
    try{
        const {sectionId,title,description,subSectionId} = req.body;
        const videoFolder = req.files?.videoFile;
        if(!sectionId || !subSectionId || !description || !title) {
            return res.status(400).json({
                success:false,
                message:"Something went wrong while updating the subSection,please fill all the details carefully."
            })
        }
        const existingSubSection = await SubSection.findById(subSectionId);
        if(!existingSubSection) {
            return res.status(400).json({
                success:false,
                message:"Cannot change the subSection details as credentials doesn't match."
            })
        }
        if(videoFolder) {
            console.log("existing video has been changed thus updating the video in the db.")
            const supportedFormats = ["mp4", "webm", "ogg", "mov"];
            const videoFormat = videoFolder.name.split(".").pop().toLowerCase();
            if(!isVideoFormatSupported(videoFormat,supportedFormats)) {
                return res.status(400).json({
                    success:false,
                    message:"Video format not supported."
                })
            }
            const filesDir = __dirname + "/files/";
            if (!fs.existsSync(filesDir)) {
                fs.mkdirSync(filesDir);
            }
            tempFilePath = __dirname + "/files/" + Date.now() + `.${videoFolder.name.split(".").pop().toLowerCase()}`;
            await new Promise((resolve,reject) => {
                videoFolder.mv(tempFilePath,(err) => {
                    if(err) {
                        console.error("Error while saving file locally:", err); 
                        reject(err);
                    } else {
                        resolve();
                    }
                })
            });
            const videoUpload = await uploadToCloudinary(tempFilePath,process.env.FOLDER_NAME);
            fs.unlinkSync(tempFilePath)
            existingSubSection.videoUrl = videoUpload.secure_url;
            await existingSubSection.save();
        }
        const updateSubSection = await SubSection.findByIdAndUpdate(
            subSectionId,
            {   
                title,
                description,
            },
            {new:true}
        )
        return res.status(200).json({
            success:true,
            message:"SubSection updated successfully.",
            updateSubSection
        })
    }catch(error) {
        console.log(error.message);
        if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}

exports.deleteSubSection = async(req,res) => {
    try{
        const {subSectionId,sectionId} = req.body;
        if(!subSectionId || !sectionId) {
            return res.status(400).json({
                success:false,
                message:"Something went wrong while deleting the subsection."
            })
        }
        const deleteSubSection = await SubSection.findByIdAndDelete(subSectionId,{new:true});
        if (!deleteSubSection) {
            return res.status(404).json({
                success: false,
                message: "Subsection not found.",
            });
        }
        await Section.findByIdAndUpdate(
            sectionId,
            {
                $pull:{
                    subSection:subSectionId,
                }
            },
            { new: true }
        );
        return res.status(200).json({
            success:true,
            message:"successfully deleted the Subsection."
        })
    }catch(error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}

exports.getSubSectionDetails = async(req,res) => {
    try{
        const {subSectionId} = req.body;
        if(!subSectionId) {
            return res.status(400).json({
                success:false,
                message:"subsection id is invalid."
            })
        }
        const subSectionDetails = await SubSection.findById(subSectionId);
        if(!subSectionDetails) {
            return res.status(400).json({
                success:false,
                message:"Couldn't fetch subsection details."
            })
        }
        return res.status(200).json({
            success:true,
            message:"SubSection details fetched successfully",
            subSectionDetails
        })
    }catch(err) {
        res.status(500).json({
            success:false,
            message:"Something went wrong while fetching subSection details"
        })
    }
}