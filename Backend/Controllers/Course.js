const Course = require("../Models/Course");
const Category = require("../Models/Category");
// const Tags = require("../Models/Tags");
const User = require("../Models/User");
const fs = require("fs");
const {uploadToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();
//course sirf instructor create kar sakta hai
//add a section where instructor can update the course details....
//try to add a feature of live streaming and chating...

function toArray(input) {
    if(Array.isArray(input)) return input;
    if(typeof input === "string" && input.trim() !== "") {
        try{
            const parsed = JSON.parse(input);
            if(Array.isArray(parsed)) return parsed;
            return [input];
        }catch(err) {
            return [input];
        }
    };
    return [];
}
const MAX_SIZE = 6 * 1024 * 1024;  //6mb
function isFileTypeSupported(fileType,supportedTypes) {
    return supportedTypes.includes(fileType);
}
exports.createCourse = async(req,res) => {
    let tempFilePath;
    try{
        const userId = req.user.id;//using token..

        let {courseName,courseDescription,coursePrice,durationNumber,durationUnit,languageUsed,category} = req.body;
        const thumbnail = req.files?.thumbnailImage;
        const tags = toArray(req.body.tags);
        const prerequisites = toArray(req.body.prerequisites);
        const whatYouWillLearn = toArray(req.body.whatYouWillLearn);
        const existingCourseId = req.body?.courseId || "";
        
        if(!courseName || !durationNumber || !durationUnit || !courseDescription || !coursePrice || !languageUsed || !category) {
            return res.status(400).json({
                success:false,
                message:"Please fill all the details carefully."
            })
        }
        coursePrice = Number(coursePrice);
        durationNumber = Number(durationNumber);
        if (isNaN(coursePrice) || isNaN(durationNumber)) {
            return res.status(400).json({
                success: false,
                message: "Course price must be a valid number.",
            });
        }
        if ((whatYouWillLearn && !Array.isArray(whatYouWillLearn)) || (prerequisites && !Array.isArray(prerequisites)) || (tags && !Array.isArray(tags))) {
            return res.status(400).json({
            success: false,
            message: "Invalid data format for whatYouWillLearn or prerequisites or tags"
        });
        }
        if(!userId) {
            return res.status(400).json({
                success:false,
                message:"Something went wrong"
            })
        }
        const instructorDetails = await User.findById(userId);
        if(!instructorDetails) {
            return res.status(404).json({
                success:false,
                message:"Instructor details not found."
            })
        }
        // not nesccessary to check the details...
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails) {
            return res.status(404).json({
                success:false,
                message:"Category details not found."
            })
        }
        
        let image_url = "";
        if(thumbnail) {
            const supportedFileTypes = ["jpeg","jpg","png"];
            const thumbnailType = thumbnail.name.split(".").pop().toLowerCase();
            if(!isFileTypeSupported(thumbnailType,supportedFileTypes)) {
                return res.status(400).json({
                    success:false,
                    message:"File format not supported."
                })
            }
            if(thumbnail.size > MAX_SIZE) {
                return res.status(400).json({
                    success:false,
                    message:"File size too large."
                })
            }
            const filesDir = __dirname + "/files/";
            if (!fs.existsSync(filesDir)) {
                fs.mkdirSync(filesDir);
            }
            tempFilePath = __dirname + "/files/" + Date.now() + `.${thumbnail.name.split(".").pop().toLowerCase()}`;
            await new Promise((resolve, reject) => {
                thumbnail.mv(tempFilePath, (err) => {
                    if (err) {
                        console.error("Error while saving file locally:", err); 
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            const response = await uploadToCloudinary(tempFilePath,process.env.FOLDER_NAME); // can pass the image quality..
            image_url = response.secure_url;

            fs.unlinkSync(tempFilePath);
        }

        let existingCourseData;
        if(existingCourseId) {
            existingCourseData = await Course.findById(existingCourseId);
            if(!existingCourseData) {
                return res.status(404).json({
                    success:false,
                    message:"No valid course found."
                })
            }
            if(existingCourseData.category.toString() !== category) {
                await Category.findByIdAndUpdate(
                    existingCourseData.category,
                    {
                        $pull:{
                            courses:existingCourseId,
                        }
                    }
                );
                await Category.findByIdAndUpdate(
                    category,
                    {
                        $push:{
                            courses:existingCourseId,
                        }
                    }
                )
            }
            if(!thumbnail) {
                image_url = existingCourseData.thumbnail;
            }
            existingCourseData.courseName = courseName.trim();
            existingCourseData.category = category;
            existingCourseData.courseDescription = courseDescription.trim(),
            existingCourseData.coursePrice = coursePrice;
            existingCourseData.courseDuration = {
                value: durationNumber,
                unit: durationUnit
            };
            existingCourseData.whatYouWillLearn = whatYouWillLearn;
            existingCourseData.languageUsed = languageUsed;
            existingCourseData.thumbnail = image_url;
            existingCourseData.tags = tags;
            existingCourseData.prerequisites = prerequisites;
            
            await existingCourseData.save();
            return res.status(200).json({
                success:true,
                message:"Course details updated successfully."
            })

        }
        else {
            if(!image_url) {
                image_url = "https://res.cloudinary.com/dar413qqp/image/upload/v1752479891/uploadedDocs/hzti6trwbjgx1imne1uc.png"   //setting default thumnail....
            }
            const courseData = await Course.create({
                instructor: instructorDetails._id,
                courseName:courseName.trim(),
                courseDescription:courseDescription.trim(),
                coursePrice,
                courseDuration: {
                    value: durationNumber,
                    unit: durationUnit
                },
                whatYouWillLearn,
                languageUsed,
                category: categoryDetails._id,
                thumbnail: image_url,
                tags,
                prerequisites
            })

            // add this course to the user schema of the instructor...
            await User.findByIdAndUpdate(
                {_id: instructorDetails._id},
                {
                    $push:{
                        courses:courseData._id,
                    }
                },
                {new:true},
            )
            
            // add the course in the Category schema
            await Category.findByIdAndUpdate(
                {_id: categoryDetails._id},
                {
                    $push:{
                        courses:courseData._id,
                    }
                },
                {new:true}
            )

            res.status(201).json({
                success:true,
                message:"Course created successfully.",
                courseData
            })
        }        
    }catch(error) {
        console.error(error.message);
        if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }
        if (error.name === 'ValidationError') {
            console.error("Validation error details:", error.errors);
        }
        res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}

// 
//all things must be populated....
exports.getAllCourses = async(req,res) => {
    try{
        const response = await Course.find({},
            {
                courseName:true,
                courseDescription:true,
                courseDuration:true,
                coursePrice:true,
                category:true,
                whatYouWillLearn:true,
                languageUsed:true,
                thumbnail:true,
                ratingAndReview:true,
                studentsEnrolled:true,
                courseContent:true,
                instructor:true,
                tags:true,
                prerequisites:true
            }
        ).populate("instructor").populate("category").populate("studentsEnrolled").populate("ratingAndReview").populate("courseContent").exec();
        console.log("Printing all the courses.");
        console.log(response);
        return res.status(200).json({
            success:true,
            message:"All courses are being fetched successfully.",
            data:response
        })
    }catch(error) {
        console.error(error.message);
        res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}

exports.getCourseDetails = async(req,res) => {
    try{
        const {courseId} = req.body;
        const courseDetails = await Course.findById(courseId).populate(
            {
                path:"instructor",
                populate: [
                    { path: "additionalDetails" },
                    { path: "courses" },
                    { path: "courseProgress" }
                ]
            }
        ).populate(
            {
                path:"category",
            }      
        ).populate(
            {
                path:"courseContent",
                populate:[
                    {path:"subSection"}
                ]
            }
        ).populate(
            {
                path:"studentsEnrolled",
            }
        ).populate(
            {
                path:"ratingAndReview",
                populate:[
                    {path:"user"},
                    {path:"course"}
                ]
            }
        ).exec();
        if(!courseDetails) {
            return res.status(400).json({
                success:false,
                message:`Could not find the course with ${courseId}`
            })
        }
        return res.status(200).json({
            success:true,
            message:"Course Details fetched successfully.",
            courseDetails
        })
    }catch(error) {
        console.error(error.message);
        res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}