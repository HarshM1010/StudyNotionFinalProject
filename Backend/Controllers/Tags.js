// const Tags = require("../Models/Tags");
// //Tags sirf admin create kar sakta hai...
// exports.createTag = async(req,res) => {
//     try{
//         const {name,description} = req.body;
//         if(!name || !description) {
//             return res.status(400).json({
//                 success:false,
//                 message:"Please fill all the details carefully."
//             })
//         }
//         const tagDetails = await Tags.create({
//             name,description
//         });
//         return res.status(200).json({
//             success:true,
//             message:"Tag created successfully."
//         })
//     }catch(error) {
//         console.log(error.message);
//         res.status(500).json({   
//             success:false,
//             message:"Something went wrong while creating the tag."
//         })
//     }
// }

// exports.getaAllTags = async(req,res) => {
//     try{
//         const allTags = Tags.find({},{name:true},{description:true});
//         return res.status(200).json({
//             success:true,
//             message:"All Tags fectched successfully."
//         })
//     }catch(error) {
//         console.log(error.message);
//         res.status(500).json({
//             success:false,
//             message:"Something went wrong while fetching all the tags."
//         })
//     }
// }

