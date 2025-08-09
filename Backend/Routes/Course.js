const express = require("express");
const router = express.Router();

const {createCourse,getCourseDetails,getAllCourses} = require("../Controllers/Course");
const {createCategory,getAllCategories,findCategory,newCourses,trendingCourses,popularCoursesByCategory} = require("../Controllers/Category");
const {createRatingAndReview,totalRatings,getAverageRating,getAllRatingsAndReviews} = require("../Controllers/RatingAndReview");
const {createSection,updateSection,deleteSection,getSectionDetails} = require("../Controllers/Section");
const {createSubSection,updateSubSection,deleteSubSection,getSubSectionDetails} = require("../Controllers/SubSection");
// const {addBulkEnrollments} = require("../Controllers/studentsEnrolled");
const {auth,isStudent,isAdmin,isInstructor,isAdminOrInstrutor} = require("../Middlewares/auth");
const {createWishList,deleteWishList,getWishList} = require("../Controllers/WishList");
const {markLectureComplete} = require("../Controllers/CourseProgress");

//related to course
router.post("/create-course",auth,isInstructor,createCourse);  // a course can only be created by an instructor....
router.post("/get-course-details",getCourseDetails);  //course details can only be fetched by admin or an instrutor...
router.get("/get-all-courses",auth,isAdmin,getAllCourses);

//related to category
router.post("/create-category",auth,isAdmin,createCategory); // category can only be created by admin...
router.get("/get-all-categories",getAllCategories);
router.post("/find-category",findCategory);
router.post("/new-courses",newCourses);
router.post("/trending-courses",trendingCourses);
router.post("/popular-courses-by-category",popularCoursesByCategory);

//related to rating and review.. 
router.post("/create-RatingAndReview",auth,isStudent,createRatingAndReview);
router.post("/average-Rating",getAverageRating);
router.post("/all-RatingsAndReviews",getAllRatingsAndReviews);
router.post("/total-Ratings",totalRatings);

//related to section
router.post("/create-section",auth,isInstructor,createSection);
router.put("/update-section",auth,isInstructor,updateSection);
router.post("/delete-section",auth,isInstructor,deleteSection);
router.post("/get-section-details",auth,isInstructor,getSectionDetails);

//related to subsection
router.post("/create-subsection",auth,isInstructor,createSubSection);
router.put("/update-subsection",auth,isInstructor,updateSubSection);
router.post("/delete-subsection",auth,isInstructor,deleteSubSection);
router.post("/get-sub-section-details",auth,isInstructor,getSubSectionDetails);

//add to cart
router.post("/add-to-cart",auth,createWishList);
router.delete("/remove-course",auth,deleteWishList);
router.get("/get-wishlist",auth,getWishList);

//courseProgress
router.post("/course-progress",auth,isStudent,markLectureComplete);


// router.post("/studentsEnrolled/:courseId",addBulkEnrollments);

module.exports = router;

// router.get("/student",auth,isStudent,(req,res) => {
//     res.json({
//         success:true,
//         message:" This is protected route for student"
//     })
// })


//students enrolled adding bulk data
