const purchaseHistory = require("../Models/PurchaseHistory");
const Course = require("../Models/Course");
const { default: mongoose } = require("mongoose");

exports.addPurchaseHistory = async(req,res) => {
    try{
        const userId = req.user.id;
        const {courseId} = req.body;
        if(!userId || !courseId) {
            return res.status(401).json({
                success:false,
                message:"Something went wrong."
            })
        }
        const alreadyPurchased = await purchaseHistory.findOne({
            user:userId,
            course:courseId
        });
        if (alreadyPurchased) {
        return res.status(409).json({
            success: false,
            message: "Course already purchased by user.",
        });
        }
        const courseDetails = await Course.findById(courseId);
        if(!courseDetails) {
            return res.status(400).json({
                success:false,
                message:"Something went wrong."
            })
        }
        const result = await Course.aggregate([
            {
                $match:{
                    _id: mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $project:{
                    enrolledAt:{
                        $filter:{
                            input:"$studentsEnrolled",
                            as:"enrollment",
                            cond: { $eq: ["$$enrollment.user",mongoose.Types.ObjectId(userId)]}
                        }
                    }
                }
            }
        ]);
        const enrolledAtDate = result[0]?.enrolledAt[0]?.enrolledAt;
        const history = await purchaseHistory.create({
            userId,courseId,coursePrice:courseDetails.coursePrice,purchasedAt:enrolledAtDate
        })

        return res.status(200).json({
            success:true,
            message:"Purchase details saved successfully.",
            history
        })
    }catch(error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while fetching data."
        })
    }
}

exports.getAllPurchaseHistory = async(req,res) => {
    try{
        const {userId} = req.body;
        const purchaseHistory = await purchaseHistory.find({ user: userId }).populate("user").populate("course").exec();
        
        return res.status(200).json({
            success:true,
            message:"All purchase history have been fetched successfully.",
            purchaseHistoryData: purchaseHistory,
        })
    }catch(error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while fetching data."
        })
    }
}