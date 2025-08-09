const express = require("express");
const router = express.Router();

const {createProfile,deleteAccount,getAllUserDetails} = require("../Controllers/profile");
const {changePassword} = require("../Controllers/auth");
const {updateProfilePicture} = require('../Controllers/updateProfilePic');
const {auth} = require("../Middlewares/auth");

router.post("/create-profile",auth,createProfile);
router.put("/update-profile",auth,createProfile);
router.delete("/delete-account",auth,deleteAccount);
router.get("/get-all-userdetails",auth,getAllUserDetails);
router.put("/change-password",auth,changePassword);
router.put("/update-profile-picture",auth,updateProfilePicture);

module.exports = router;