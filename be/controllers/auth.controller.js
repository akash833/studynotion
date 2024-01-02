const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const OTP = require("../models/otp");

require("dotenv").config();

// sendOTP
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    //check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(401).json({
        success: false,
        message: "User is already created",
      });
    }

    // if user is not exists then generate the otp for email verification
    // check the otp is unique
    let otp, otpExists;

    do {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });
      otpExists = await OTP.findOne({ otp });
    } while (otpExists);

    const saveOTP = await OTP.create({
      email,
      otp,
    });

    return res.status(201).json({
      success: true,
      data: saveOTP,
      message: "User created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// signup
exports.signupUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNo,
      password,
      confirmPassword,
      accountType,
      otp,
    } = req.body;

    // validate krlo
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNo ||
      !password ||
      !confirmPassword ||
      !accountType ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All field is required",
      });
    }

    // match the password and confirm password
    const isBothPassSame = password === confirmPassword;
    if (!isBothPassSame) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password is not same",
      });
    }

    // check if the user is exists or not
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(401).json({
        success: false,
        message: "User is already exists",
      });
    }

    // find most recent otp and validate it
    const recentOtp = OTP.findOne({ email });

    if(recentOtp.otp !== otp){
      return res.status(400).json({
        success: false,
        message: "OTP is not valid",
      });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create entity in the db
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phoneNo,
      password: hashedPassword,
      accountType,
    });

    return res.status(201).json({
      success: true,
      data: newUser,
      message: "User created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// login
exports.loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email, role });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Your email id is not registered",
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Your credentials are not valid",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
      message: "User login successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// changePassword
exports.changePassword = async (req, res) => {
  try {
    const { email, currentPass, newPass } = req.body;

    const user = await User.findOne({ email });
    const isValid = await bcrypt.compare(currentPass, user.password);

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Please enter correct password",
      });
    }

    const newHashedPassword = await bcrypt.hash(newPass, 10);

    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        $set: { password: newHashedPassword },
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      data: updatedUser,
      message: "User created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
