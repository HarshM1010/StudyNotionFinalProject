const cron = require('node-cron');
const User = require("../Models/User");
const CourseProgress = require("../Models/CourseProgress");
const Course = require("../Models/Course");
const Profile = require("../Models/Profile");

//testing: check for student and instrutor whether their courses and course progress gets delete or not...
 
// Runs every day at 2:00 AM
//if once requested for deletion then again requested in that case tell user that he cannot request for account deletion any further more..
//mail user that their account has been deleted successfully.
cron.schedule('0 2 * * *', async () => {   
    try{
        console.log("Checking accounts to be deleted...")
        const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
        // const threeDaysAgo = new Date(Date.now() - 1*60*1000);   // for testing purpose.
        const usersToDelete = await User.find({
            isDeletionRequested: true,
            deletionRequestedAt: { $lte: threeDaysAgo }
        });
        //have got the list of all the users who must be deleted...
        for(const user of usersToDelete) {
            const userDetails = await User.findById(user._id);
            const profileId = userDetails.additionalDetails;

            // will check if the student have bought any courses to make sure that his courseProgress gets deleted...
            if(userDetails.accountType === "Student") {
                const courseProgressToDelete = await CourseProgress.find({ userId: user._id });  // will give me all the courseProgress which is registered for a particular user..
                for(const progressDelete of courseProgressToDelete) {
                    await CourseProgress.findByIdAndDelete(progressDelete);
                }
            }
            
            for(const courseId of userDetails.courses) {
                //we will ask the instructor whether to delete all his courses or not...
                if(userDetails.deleteCourses) {
                    await Course.findByIdAndDelete(courseId);
                }

                //unroll the student from the studentsEnrolled array...
                if(userDetails.accountType === "Student") {
                    await Course.findByIdAndUpdate(
                        courseId,
                        {
                            $pull:{
                                studentsEnrolled: { user: user._id }
                            }
                        },
                        {new:true}
                    )
                }
                
            }
            await Profile.findByIdAndDelete(profileId);
            await User.findByIdAndDelete(user._id);
        }

    }catch(error){
        console.error("Error deleting users:", error.message);
    }
    
}) 
