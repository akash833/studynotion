const express = require("express");
const {
  signupUser,
  loginUser,
  sendOTP,
  changePassword,
} = require("../controllers/auth.controller");
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/resetPassword.controller");
const router = express.Router();

router.post("/signup",signupUser);
router.post("/login",loginUser);
router.post("/sendOTP", sendOTP);
router.post("/changePassword", changePassword);
router.post("/resetPasswordToken", resetPasswordToken);
router.post("/resetPassword", resetPassword);

module.exports = router;