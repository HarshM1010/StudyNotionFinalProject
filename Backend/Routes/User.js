const express = require("express");
const router = express.Router();

const {contactUs} = require("../Controllers/ContactUs");
const {addPurchaseHistory,getAllPurchaseHistory} = require("../Controllers/PurchaseHistory");

const {forgotPassword,resetPassword} = require("../Controllers/ResetPassword");
const {auth,isStudent,isAdmin,isInstructor} = require("../Middlewares/auth");


router.post("/contactUs",contactUs);
router.post("/addPurchaseHistory",addPurchaseHistory);
router.post("/getAllPurchaseHistory",getAllPurchaseHistory);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password",resetPassword);
router.get("/me",auth,(req,res) => {
    res.json({
        id:req.user.id,
        accountType:req.user.accountType
    });
})

//protected routes for student,instructor and admin...
// router.get("/student",auth,isStudent,(req,res) => {
//     res.json({
//         success:true,
//         message:" This is protected route for student"
//     })
// })
// router.get("/instructor",auth,isInstructor,(req,res) => {
//     res.json({
//         success:true,
//         message:"This is protected route for Instructor"
//     })
// })
// router.get("/admin",auth,isAdmin,(req,res) => {
//     res.json({
//         success:true,
//         message:"This is protected route for Admin"
//     })
// })

module.exports = router;