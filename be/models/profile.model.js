const mongoose = require("mongoose");

const Profile = mongoose.Schema({
  profession: {
    type: String,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  About: {
    type: String,
    trim: true,
  },
  phoneNo: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Profile", Profile);