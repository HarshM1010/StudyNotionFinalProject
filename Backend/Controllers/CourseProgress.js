const courseProgress = require("../Models/CourseProgress");

exports.markLectureComplete = async(req,res) => {
    try{
        const userId = req.user.id;
        const {courseId,subSectionId} = req.body;
        if(!userId) {
            return res.status(200).json({
                success:false,
                message:"Cannot get user details."
            })
        }
        if(!courseId || !subSectionId) {
            return res.status(200).json({
                success:false,
                message:"Cannot get courseId."
            })
        }
        let progress = await courseProgress.findOne({userId,courseId});
        if(!progress) {
            // If no progress found, create one
            progress = await courseProgress.create({
                userId,
                courseId,
                completedVideos:[subSectionId],
            })
        }
        else {
            if(!progress.completedVideos.includes(subSectionId)) {
                progress.completedVideos.push(subSectionId);
                await progress.save();
            }
        }
        res.status(200).json({
            success: true,
            message: "Lecture marked as completed.",
            data: progress
        });
    }catch(err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// exports.updateLastWatched = async(req,res) => {
//     try{
//         const userId = req.user.id;
//         const {courseId,subSectionId} = req.body;
//         if(!userId) {
//             return res.status(200).json({
//                 success:false,
//                 message:"Cannot get user details."
//             })
//         }
//         if(!courseId || !subSectionId) {
//             return res.status(200).json({
//                 success:false,
//                 message:"Cannot get courseId."
//             })
//         }
//         const progress = await courseProgress.findOneAndUpdate(
//             {userId,courseId},
//             {
//                 $set:{
//                     lastWatchedVideo:subSectionId,
//                     lastWatchedTime:new Date(),
//                 },
//             }
//         )
//     }catch(err){

//     }
// }