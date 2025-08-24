const express = require("express");
const router = express.Router();

const {capturePayment,verifySignature} = require("../Controllers/Payments");
const {auth,isStudent} = require("../Middlewares/auth");

router.post("/capture-payment",auth,isStudent,capturePayment);
router.post("/verify-signature",auth,isStudent,verifySignature);

module.exports = router;