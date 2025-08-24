const {instance} = require("../Config/razorpay");
const Course = require('../Models/Course');
const User = require("../Models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollment");
const crypto = require("crypto");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

//capture the payment and initiate the Razorpay order
exports.capturePayment = async(req,res) => {
    const {courseId} = req.body;
    const userId = req.user.id;
    if(!userId) {   // if the user is not logged in...
        return res.status(401).json({
            success:false,
            message:"Please login to buy any course."
        })
    }
    if(!courseId) {
        return res.status(400).json({
            success:false,
            message:"Something went wrong while validating credentials."
        })
    }
    let courseDetails;
    //db call...
    try{
        courseDetails = await Course.findById(courseId);
        if(!courseDetails) {
            return res.status(400).json({
                success:false,
                message:"Something went wrong."
            })
        }
        
        //will check if user had already purchased the course or not..
        const isPreviouslyEnrolled = await Course.findOne(
            {
                _id: courseId,
                studentsEnrolled:new mongoose.Types.ObjectId(userId),
            }
        )
        if(isPreviouslyEnrolled) {
            return res.status(400).json({
                success:false,
                message:"User has been already enrolled for this course."
            })
        }
    }catch(error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Something went wrong. Please try again later.",
            error:error.message,
        })
    }

    const amount = (courseDetails.coursePrice)*100;  //amount and currency are two mandatory things for an order to be placed successfully...
    const currency = "INR";
    //we have created an order...
    const options = {
        amount,       // convert to paisa
        currency,
        receipt:`receipt_${Date.now()}`,
        notes:{
            courseId:courseId.toString(),
            userId:userId.toString(),
        }
    }
    // console.log("Course Price:", courseDetails.coursePrice);
    // console.log("Amount (paise):", amount);
    // console.log("User ID:", userId);
    // console.log("Course ID:", courseId);
    // console.log("Options:", options);
    // console.log("Razorpay Instance:", instance);
    //function call
    try{
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        
        return res.status(200).json({
            success:true,
            courseName: courseDetails.courseName,
            coursePrice: courseDetails.coursePrice,
            // courseDescription:courseDetails.courseDescription,
            // thumbnail:courseDetails.thumbnail,
            orderId: paymentResponse.id,
            currency:paymentResponse.currency,
            amount: paymentResponse.amount,
            // courseDuration: courseDetails.courseDuration,
        })
    }catch(error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Could not initiate the order. Try again after a while."
        })
    }   
}

//verify the signature of Razorpay and Server...
//checksum is used to verify the integrity of the data sent...(readmore)
exports.verifySignature = async(req,res) => {
    // "258741369"
    // we cannot convert the signature we have got from the req.body to its autual form so we will convert the webhooksecret into signature by using three steps..
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    //3 step process
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");
 
    if(razorpay_signature === expectedSignature) {  // payment is authorized...
        console.log("Payment is authorized...");
        const userId = req.user.id;
        try{
            const newUserDetails = await User.findByIdAndUpdate(
                userId,
                { $addToSet: { courses: new mongoose.Types.ObjectId(courseId) } },
                {new : true}
            )
            if(!newUserDetails) {
                return res.status(400).json({
                    success:false,
                    message:"Something went wrong."
                })
            }

            const newCourseDetails = await Course.findByIdAndUpdate(
                courseId,
                { $addToSet: { studentsEnrolled: new mongoose.Types.ObjectId(userId) } },
                {new:true}
            )
            if(!newCourseDetails) {
                return res.status(400).json({
                    success:false,
                    message:"Something went wrong."
                })
            }

            //send the mail of confirmation
            await mailSender(newUserDetails.email,"Congo for purchasing the course.","Your most welcome to Studynotion family.");

            return res.status(200).json({
                success:true,
                message:"Signature verified and course added successfully."
            })
        }catch(error){
            console.log(error.message);
            return res.status(500).json({
                success:false,
                message:"Internal server error."
            })
        }
    }
    else {
        return res.status(400).json({
            success:false,
            message:"Invalid request."
        })
    }
}