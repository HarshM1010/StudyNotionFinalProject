const RatingAndReview = require("../Models/RatingAndReview");
const Course = require("../Models/Course");
const mongoose = require("mongoose");

//we are allowing the user for review and rate only once..
exports.createRatingAndReview = async(req,res) => {
    try{
        const userId = req.user.id;
        const {courseId,rating,review} = req.body;
        if(!courseId || !rating || !review || !userId) {
            return res.status(400).json({
                success:false,
                message:"Something went wrong."
            })
        }
        const isEnrolled = await Course.findOne(
            {
                _id:courseId,
                studentsEnrolled: {$elemMatch: { user: userId } }
            }
        )
        // const isEnrolled = await Course.findOne({
        //     _id: courseId,
        //     "studentsEnrolled.user": userId
        // });
        if(!isEnrolled) {
            return res.status(401).json({
                success:false,
                message:"User not authorized to review this course."
            })
        }

        //will check if the user has not reviewed the course earlier.
        const isEarlyReviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId
        })
        if(isEarlyReviewed) {
            return res.status(401).json({
                success:false,
                message:"User has reviwed this course earlier."
            })
        }
        const newRatingAndReview = await RatingAndReview.create({
            rating,review,user:userId,course:courseId
        })
        //update the rating and review on the course,
        await Course.findByIdAndUpdate(courseId,
            {
                $push:{
                    ratingAndReview:newRatingAndReview._id
                }
            },
            {new:true}
        )
        return res.status(200).json({
            success:true,
            message:"The course has been reviewed successfully.",
            newRatingAndReview,
        })
    }catch(error) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.totalRatings = async(req,res) => {
    try{
        const {courseIds} = req.body;
        if(!Array.isArray(courseIds) || courseIds.length === 0) {
            return res.status(400).json({
                success:false,
                message:"courseIds must be a non-empty array",
            })
        }
        //validation of course Id....
        const validCourseIds = courseIds.filter(id => mongoose.Types.ObjectId.isValid(id)).map(id => new mongoose.Types.ObjectId(id));
        if(validCourseIds.length === 0) {
            return res.status(400).json({
                success: false, 
                message: "No valid courseIds provided"
            });
        }
        const counts = await Promise.all(
            validCourseIds.map(id =>
                RatingAndReview.countDocuments({ course: id })
            )
        );
        const totalRating = {};
        validCourseIds.forEach((id,index) => {
            totalRating[id.toString()] = counts[index];
        })
        return res.status(200).json({
            success:true,
            message:"Fetched total number of user who have given the rating.",
            totalRating
        })
    }catch(error) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//new to learn....
exports.getAverageRating = async(req,res) => {
    try{
        const {courseIds} = req.body;
        if(!Array.isArray(courseIds) || courseIds.length === 0) {
            return res.status(400).json({
                success:false,
                message:"courseIds must be a non-empty array",
            })
        }
        //validation of course Id....
        const validCourseIds = courseIds.filter(id => mongoose.Types.ObjectId.isValid(id)).map(id => new mongoose.Types.ObjectId(id));
        if(validCourseIds.length === 0) {
            return res.status(400).json({
                success: false, 
                message: "No valid courseIds provided"
            });
        }
        const results = await RatingAndReview.aggregate([
            {
                $match:{
                    course: { $in: validCourseIds },  // here we fetched all the courses having id same as that of courseId..
                },
            },
            {
                $group:{
                    _id:"$course",
                    average: {$avg: "$rating"},   
                }
            },
            {
                $project:{
                    _id:0,
                    courseId:"$_id",    
                    averageRating:{ $round: ["$average",1]}
                }
            }
        ]);
        const averageRatings = {};
        // Convert results array to map: { courseId1: avg, courseId2: avg, ... }
        validCourseIds.forEach(id => {
            const found = results.find(r => r.courseId.toString() === id.toString());
            averageRatings[id] = found ? found.averageRating : 0;
        });
        
        return res.status(200).json({
            success:true,
            message:"Average rating calculated.",
            averageRatings,
        })
        
    }catch(error){
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getAllRatingsAndReviews = async(req,res) => {
    try{
        const allReviews = await RatingAndReview.find({}).sort({rating: "desc"})
                                .populate({
                                    path:"user",
                                    select:"firstName lastName email image"
                                })
                                .populate({
                                    path:"course",
                                    select:"courseName"
                                })
                                .exec();
        return res.status(200).json({
            success:true,
            message:"All ratings and reviews are fetched successfully.",
            allReviews:allReviews
        })
    }catch(error) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}