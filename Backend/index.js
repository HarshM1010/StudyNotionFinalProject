const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const fileupload = require("express-fileupload");
const {dbConnect} = require("./Config/database");
const PORT = process.env.PORT || 4000;
const userRoutes = require("./Routes/User");
const profileRoutes = require("./Routes/Profile");
const courseRoutes = require("./Routes/Course");
const paymentRoutes = require("./Routes/Payment");
const authRoutes = require("./Routes/Auth");
require("./utils/scheduleDelete");

const cookieParser = require("cookie-parser");
const cloudinary = require("./Config/Cloudinary");

app.use(cors({ 
    origin: "http://localhost:5173", 
    credentials:true,
})); 

app.use(express.json());
app.use(fileupload());
app.use(cookieParser());
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/user",userRoutes);

dbConnect();
cloudinary.cloudinaryConnect();

app.get("/",(req,res) => {
    res.send(`<h1>This is Home page....</h1>`);
})
app.listen(PORT,() => {
    console.log(`Server started successfully at port ${PORT}`);
})