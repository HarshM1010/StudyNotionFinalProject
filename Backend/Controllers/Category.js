const { default: mongoose } = require("mongoose");
const Category = require("../Models/Category");
const Course = require("../Models/Course");

//Category sirf admin create kar sakta hai...
//make sure to make a controller to delete the category and if any is repeated or not.
exports.createCategory = async(req,res) => {
    try{
        const {name,description} = req.body;
        if(!name || !description) {
            return res.status(400).json({
                success:false,
                message:"Please fill all the details carefully."
            })
        }
        const categoryDetails = await Category.create({
            name,description
        });
        return res.status(200).json({
            success:true,
            message:"Category created successfully."
        })
    }catch(error) {
        console.log(error.message);
        res.status(500).json({   
            success:false,
            message:"Something went wrong while creating the Category."
        })
    }
}

exports.findCategory = async(req,res) => {
    try{
        const {categoryId} = req.body;
        if(!categoryId) {
            return res.status(400).json({
                success:false,
                message:"Something went wrong while finding the Category."
            })
        }
        const response = await Category.findById(categoryId);
        return res.status(200).json({
            success:true,
            response
        })
    }catch(error) {
        console.log(error.message);
        res.status(500).json({   
            success:false,
            message:"Something went wrong while finding the Category."
        })
    }
}
exports.getAllCategories = async(req,res) => {
    try{
        const allCategories = await Category.find({},{ name: 1, description: 1 });
        return res.status(200).json({
            success:true,
            message:"All Categories fetched successfully.",
            allCategories
        })
    }catch(error) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:"Something went wrong while fetching all the Categories."
        })
    }
}
//CategoryPageDetails...
//always the course with higher number of students enrolled might not be the top selling course...
exports.popularCoursesByCategory = async(req,res) => {
    try{
        const {categoryId} = req.body;
        if(!categoryId) {
            return res.status(400).json({
                success:false,
                message:"Something went wrong."
            })
        }
        const mostPopularCourses = await Course.aggregate([
            {
                $match:{
                    category: new mongoose.Types.ObjectId(categoryId),  // will give me all the courses having this category..
                }
            },
            {
                $addFields:{
                    enrollmentCount: { $size: "$studentsEnrolled"}
                }
            },
            {
                $sort: {enrollmentCount: -1}
            },
            {
                $limit: 10         // top 10 popular courses in that category
            },
            {
                $project:{
                    courseName:1,
                    courseDuration:1,
                    coursePrice:1,
                    thumbnail:1,
                    languageUsed:1,
                    courseDescription:1
                }
            }
        ])

        return res.status(200).json({
            success:true,
            message:"Most popular courses a/c to category are fetched successfully.",
            popularCourses:mostPopularCourses
        })
    }catch(error) {
        console.error(error.message);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while fetching most popular courses.",
            mostPopularCourses,
        })
    }
}

exports.newCourses = async(req,res) => {
    try{
        const {categoryId} = req.body;
        if(!categoryId) {
            return res.status(400).json({
                success:false,
                message:"Something went wrong."
            })
        }
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const recentCourses = await Course.find({
            category:new mongoose.Types.ObjectId(categoryId),
            createdAt: {$gte: oneWeekAgo},
        }).sort({createdAt: -1}).lean();
        
        return res.status(200).json({
            success:true,
            message:"All new courses are fetched successfully.",
            recentCourses,
        })
    }catch(error) {
        console.error(error.message);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while fetching New courses."
        })
    }
}

//$match: is used to filter entire documents, not individual elements inside arrays.it either includes or excludes the entire document.
//$filter: Filters the contents of an array.Keeps only matching elements

//recently most purchased course here recent is one week ago...
exports.trendingCourses = async(req,res) => {
    try{
        const {categoryId} = req.body;
        if(!categoryId) {
            return res.status(400).json({
                success:false,
                message:"Something went wrong."
            })
        }
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const trendingCourse = await Course.aggregate([
            {
                $match:{
                    category: new mongoose.Types.ObjectId(categoryId),
                }
            },
            {
                $project:{
                    courseName:1,
                    courseDuration:1,
                    coursePrice:1,
                    thumbnail:1,
                    languageUsed:1,
                    courseDescription:1,
                    studentsEnrolled:{
                        $filter:{
                            input:"$studentsEnrolled", 
                            as:"enrollment",
                            cond: {$gte: ["$$enrollment.enrolledAt", oneWeekAgo]}
                        }
                    }
                }
            },
            {
                $addFields:{
                    recentEnrollments: {$size: "$studentsEnrolled"}
                }
            },
            {
                $sort: {recentEnrollments: -1}
            },
            {
                $limit: 10
            }
        ]);

        return res.status(200).json({
            success:true,
            message:"All trending courses are fetched successfully.",
            trendingCourse,
        })
    }catch(error) {
        console.error(error.message);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while fetching trending courses."
        })
    }
}

// exports.frequentlyBoughtTogether = async(req,res) => {
//     try{
//         const {courseId} = req.body;
//         if(!courseId) {
//             return res.status(400).json({
//                 success:false,
//                 message:"Something went wrong."
//             })
//         }

//         const result = await User.aggregate([
//             {
//                 $match:{
//                     courses: mongoose.Types.ObjectId(courseId)  //fetched all the users having same course purchased which we are looking for
//                 }
//             },
//             {
//                 $addFields:{
//                     courses:{
//                         $filter:{
//                             input:"$courses",
//                             as:"course",
//                             cond:{ $ne: ["$$course.course",courseId]}  //deleting this course so we can count the number of times other courses are purchased..
//                         }
//                     }
//                 }
//             },
//             {
//                 $group:{
//                     _id:"$courses.course",
//                     count: {$sum:1}
//                 }
//             },
//             {
//                 $sort: {count: -1}
//             },
//             {
//                 $lookup: {
//                 from: "Course",
//                 localField: "_id",
//                 foreignField: "_id",
//                 as: "course"
//                 }
//             },
//             {
//                 $unwind: "$course"
//             },
//             {
//                 $project:{
//                     courseName:"$course.courseName",
//                     courseDescription:"$course.courseDescription",
//                     courseDuration:"$course.courseDuration",
//                     coursePrice:"$course.coursePrice",
//                 }
//             }
//         ])

//         return res.status(200).json({
//             success:true,
//             message:"All frequently bought together courses are fetched successfully."
//         })
//     }catch(error) {
//         console.error(error.message);
//         return res.status(500).json({
//             success:false,
//             message:"Something went wrong while fetching frequently bought together courses."
//         })
//     }
// }

//related categories wala section baad mein karenge after the completion of the project....