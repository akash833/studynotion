const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

require("dotenv").config();

//auth
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("AccessToken").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "access token not found",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode)
      req.user = decode;
      next();
    } catch (err) {
      console.log("error in jwt verify", err);
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "jwt token is invalid",
      });
    }
  } catch (err) {
    console.log("error in auth", err);
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//isStudent
exports.isStudent = async (req,res,next) => {
    try{
        const { accountType } = req.user;

        if (accountType !== "Student") {
            return res.status(500).json({
              success: false,
              message: "This is protected route for student only",
            });
        }
        next();
    }catch(err){
        console.log('error in student verification',err);
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "Server error",
        });
    }
}

//isInstructor
exports.isInstructor = async (req, res, next) => {
  try {
    const { accountType } = req.user;

    if (accountType !== "Instructor") {
      return res.status(500).json({
        success: false,
        message: "This is protected route for Instructor only",
      });
    }
    next();
  } catch (err) {
    console.log("error in Instructor verification", err);
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    const { accountType } = req.user;

    if (accountType !== "Admin") {
      return res.status(500).json({
        success: false,
        message: "This is protected route for Admin only",
      });
    }
    next();
  } catch (err) {
    console.log("error in Admin verification", err);
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};