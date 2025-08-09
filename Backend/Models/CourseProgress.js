const mongoose = require("mongoose");

//use the cron job to send the email to the student every month about their progress.
//use an ai bot for assistance...
//also set a functionality where an instructor or an student can decide to receive any message a/c to them(ex. reminder for study)
//also add a functionality where lastWhatchedAt will be stored
const CourseProgressSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    completedVideos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubSection"
        }
    ],
    // lastWatchedVideo: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "SubSection",
    // },
    // lastWatchedTime: {
    //     type: Date,
    //     default: null,
    // },
})

module.exports = mongoose.model("CourseProgress",CourseProgressSchema);