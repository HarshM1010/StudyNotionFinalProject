const wishList = require("../Models/WishList");
const User = require("../Models/User");

exports.createWishList = async(req,res) => {
    try{
        const userId = req.user.id;
        const {courseId} = req.body;
        if(!courseId || !userId) {
            return res.status(400).json({
                success:false,
                message:"Something went wrong."
            })
        }
        const userDetails = await User.findById(userId);
        if(!userDetails) {
            return res.status(400).json({
                success:false,
                message:"Something went wrong."
            })
        }
        const existingWishList = await wishList.findOne({user: userId,course:courseId});
        if(existingWishList) {
            return res.status(409).json({
                success:false,
                message:"This course is already in Cart."
            })
        }
        if(userDetails.courses.includes(courseId)) {
            return res.status(409).json({
                success:false,
                message:"This course is already purchased."
            })
        }
        const wishListUpdate = await wishList.create({
            user:userId,course:courseId
        })
        return res.status(200).json({
            success:true,
            message:"Course added to wishlist successfully.",
            wishListUpdate
        })
    }catch(error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while fetching data."
        })
    }
}

exports.deleteWishList = async(req,res) => {
    try{
        const userId = req.user.id;
        const {courseId} = req.body;
        if(!courseId || !userId) {
            return res.status(400).json({
                success:false,
                message:"Something went wrong."
            })
        }
        const updatedWishList = await wishList.findOneAndDelete({user:userId,course:courseId});
        if(updatedWishList) {
            return res.status(200).json({
                success:true,
                message:"Course removed from wishlist.",
            })
        }
        else {
            return res.status(404).json({
                success: false,
                message: "Course not found in wishlist.",
            });
        }

    }catch(err) {
        return res.status(400).json({
            success:false,
            message:"Course cannot be removed from wishlist. Please try again after a while."
        })
    }
}

exports.getWishList = async(req,res) => {
    try{
        const userId = req.user.id;
        const wishListDetails = await wishList.find({user:userId}).populate("course","courseDuration courseName _id coursePrice thumbnail tags").exec();
        let totalPrice = 0;
        for(const item of wishListDetails) {
            if(item.course && item.course.coursePrice) {
                totalPrice += item.course.coursePrice;
            }
        }
        return res.status(200).json({
            success:true,
            message:"Wish list fetched successfully.",
            data:{
                wishList:wishListDetails,
                totalPrice:totalPrice,
            }
        })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"Something went wrong while fetching data."
        })
    }
} 