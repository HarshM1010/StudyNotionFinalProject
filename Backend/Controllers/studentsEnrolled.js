const Course = require("../Models/Course"); 
const { default: mongoose } = require("mongoose");
exports.addBulkEnrollments = async (req, res) => {
  try {
    const courseId = req.params.courseId;;

    // if (!mongoose.Types.ObjectId.isValid(courseId)) {
    //   return res.status(400).json({ success: false, message: "Invalid courseId" });
    // }

    const studentsEnrolled = [
       { "user": "684176b2dfb25b494aa0f681", "enrolledAt": "2025-06-09T08:00:00Z" },
  { "user": "68600e72fa4cd566f12a9cce", "enrolledAt": "2025-04-07T19:00:00Z" },
  { "user": "68600e72fa4cd566f12a9cd3", "enrolledAt": "2025-05-23T12:00:00Z" },
  { "user": "68600e72fa4cd566f12a9cd4", "enrolledAt": "2025-06-03T12:00:00Z" },
   { "user": "68600e72fa4cd566f12a9cd6", "enrolledAt": "2025-04-19T12:00:00Z" },
   { "user": "68600e72fa4cd566f12a9cd6", "enrolledAt": "2025-05-11T12:00:00Z" },
   { "user": "68600e72fa4cd566f12a9cd9", "enrolledAt": "2025-06-18T12:00:00Z" },
   { "user": "68600e72fa4cd566f12a9cdc", "enrolledAt": "2025-06-17T12:00:00Z" },
    ];
 
 


    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          studentsEnrolled: { $each: studentsEnrolled }
        }
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Students enrolled successfully.",
      data: updatedCourse
    });

  } catch (error) {
    console.error("Error enrolling students:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while enrolling students"
    });
  }
};

