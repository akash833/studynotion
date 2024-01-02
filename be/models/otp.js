const mongoose = require("mongoose");
require("dotenv").config();
const mailSender = require("../utils/mailSender");

const OTPSchema = mongoose.Schema({
    email : {
        type : String
    },
    createdAt :{
        type : Date,
        default : Date.now(),
        expires:5*60
    },
    otp : {
        type : Number
    }
})

async function sendOTPForEmailVerification(email){
    const subject = "OTP RESET PASSWORD";
    const body = `<div>The OTP for your study notion reset password - <b>${this.otp}</b></div>`;
    await mailSender(email, subject, body);
}

// this is used for verify the email
OTPSchema.pre("save", async function (next) {
  console.log("Document about to be saved:", this);
  await sendOTPForEmailVerification(this.email);
  next();
});

module.exports = mongoose.model("OTP", OTPSchema);