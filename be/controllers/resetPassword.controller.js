const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const mailSender = require("../utils/mailSender");

require("dotenv").config();

// reset password token
// token is required bcz the user is change the password with in a limit of time
// and we have to know the email for forget password that we link with the token

exports.resetPasswordToken = async (req, res) => {
  try {
    // get email from the body
    const { email } = req.body;
    // validate the email
    if (!email) {
      return res.status(401).json({
        success: true,
        message: "All field is required",
      });
    }
    // check email present in the database
    const user = User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: true,
        message: "Email is not registered",
      });
    }
    // generate token for the different screen for different user
    const payload = {
      email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10m", // expires in 10 minutes
    });
    // send the reset password screen to mail
    const resetLink = `${process.env.APP_URL}/update-password/${token}`;
    mailSender(
      email,
      "Reset password",
      `<div>Reset your study notion password <a href=${resetLink}>${resetLink}</a></div>`
    );
    res
      .cookie("token", token, { httpOnly: true, maxAge: 3600000 })
      .status(200)
      .json({
        success: true,
        token,
        message: "Reset link is send to your mail",
      });
  } catch (err) {
    console.log("error at reset password token", err);
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// reset password

exports.resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmNewPassword } = req.body;

    if (!newPassword || !confirmNewPassword) {
      return res.status(401).json({
        success: false,
        message: "All field required",
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(401).json({
        success: false,
        message: "new password and confirm password is not same",
      });
    }

    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("AccessToken").replace("Bearer ", "");

    console.log(token);
    if (!token) {
      return res.status(500).json({
        success: false,
        message: "Token not found",
      });
    }

    let decode;
    try {
      decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded value", decode);
    } catch (err) {
      console.log("error in jwt verify at reset password", err);
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "jwt token is invalid",
      });
    }
    const email = decode.email;
    // find the user and check the new password and old password is not equal
    const user = await User.findOne({ email });

    // return if the new password and old password is same
    const isBothEqual = await bcrypt.compare(user.password, newPassword);

    if (isBothEqual) {
      return res.status(401).json({
        success: false,
        message: "New password and old password will not be same",
      });
    }

    // hash the password and update the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
      { new: true }
    );
    // remove the password field
    updatedUser.password = undefined;

    // return the response
    res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Password changed successfully",
    });
  } catch (err) {
    console.log("error at reset password", err);
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
