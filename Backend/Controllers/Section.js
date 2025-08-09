const Section = require("../Models/Section");
const Course = require("../Models/Course");
const SubSection = require("../Models/SubSection");

//names to two sections cannot be same...
//make sure that section name doesn't get repeat....


exports.createSection = async(req,res) => {
    try{
        const {sectionName,courseId} = req.body;
        if(!sectionName || !courseId) {
            return res.status({
                success:false,
                message:"Something went wrong while creating the section."
            })
        }
        //checks for duplicate name...
        const existingSection = await Section.findOne({courseId,sectionName});
        if(existingSection){
            return res.status(409).json({
                success:false,
                message: "A section with this name already exists for this course.",
            })
        }
        const newSection = await Section.create({
            courseId,sectionName
        })
        const updateCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:newSection._id
                }
            },
            {new:true}
        )
        return res.status(200).json({
            success:false,
            message:"New Section created successfully.",
            updatedCourse:updateCourse
        })
    }catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Unable to create a new section.",
            error:error.message
        })
    }
}

exports.updateSection = async(req,res) => {
    //oldsection name must also be passed....
    try{
        const {courseId,sectionName,sectionId} = req.body;
        if(!sectionName || !courseId) {
            return res.status({
                success:false,
                message:"Something went wrong while Updating the section name."
            })
        }
        const existingSection = await Section.findOne({
            courseId,
            sectionName,
            _id: { $ne: sectionId}
        }); 
        if(existingSection){
            return res.status(409).json({
                success:false,
                message: "A section with this name already exists for this course.",
            })
        }
        const updateSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                sectionName:sectionName,
            },
            {new:true}
        )   
        return res.status(200).json({
            success:false,
            message:"Section name got updated successfully.",
        })
    }catch(error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Unable to Update the section. Please try again after a while.",
            error:error.message
        })
    }
}

exports.deleteSection = async(req,res) => {
    try{
        const {sectionId,courseId} = req.body;
        if(!sectionId || !courseId) {
            return res.status({
                success:false,
                message:"Something went wrong while deleting the section."
            })
        }
        await Section.findByIdAndDelete(sectionId,{new:true});
        await Course.findByIdAndUpdate(
            courseId,
            {
                $pull:{
                    courseContent:sectionId,
                }
            },
            { new: true }
        );
        // const subSections = await SubSection.find({sectionId:sectionId});
        // for(const subSection of subSections) {
        //     await SubSection.findByIdAndDelete(subSection._id);
        // }
        //or
        await SubSection.deleteMany({ sectionId });
        
        return res.status(200).json({
            success:true,
            message:"Section deleted successfully."
        })
    }catch(error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Unable to delete the section. Please try again after a while.",
            error:error.message
        })
    }
}

exports.getSectionDetails = async(req,res) => {
    try{
        const {sectionId} = req.body;
        if(!sectionId) {
            return res.status({
                success:false,
                message:"Something went wrong while fetching the section."
            })
        }
        const sectionDetails = await Section.findById(sectionId);
        if(!sectionDetails) {
            return res.status(400).json({
                success:false,
                message:"Couldn't find section details."
            })
        }
        return res.status(200).json({
            success:true,
            message:"Section details fetched successfully.",
            sectionDetails,
        })
    }catch(err) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong while fetching section details.",
            error:err.message
        })
    }
}