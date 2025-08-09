const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Course = require("../Models/Course")
const RatingAndReview = require("../Models/RatingAndReview")
require("dotenv").config();

const mongoURI = process.env.DATABASE_URL;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected");
  insertCourses();
  // insertRatings()
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});

const filePath = path.join(__dirname, "studentsEnrolled.json");
const rawData = fs.readFileSync(filePath, "utf-8");
const studentsEnrolled = JSON.parse(rawData);

async function insertCourses() {
  try {
    const courseId = "68602b9892e8b12d9fd42d09";
    const course = await Course.findById(courseId);
    if(!course) {
      console.error("Course not found");
      return;
    }
    course.studentsEnrolled.push(studentsEnrolled);
    await course.save();
    console.log("students inserted successfully!");
  } catch (error) {
    console.error("Error inserting sutdents:", error);
  } finally {
    mongoose.disconnect();
  }
}

// async function insertRatings() {
//   try {
//     // Step 1: Insert all ratings
//     const insertedReviews = await RatingAndReview.insertMany(ratingAndReview);
//     const insertedIds = insertedReviews.map((r) => r._id);

//     // Step 2: Update course with review IDs
//     const courseId = "68602b9892e8b12d9fd42d09";
//     const course = await Course.findById(courseId);
//     course.ratingAndReview.push(...insertedIds);
//     await course.save();

//     console.log("Ratings inserted and linked to course successfully!");
//   } catch (error) {
//     console.error("Error inserting ratings:", error);
//   } finally {
//     mongoose.disconnect();
//   }
// }
