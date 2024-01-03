const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
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

module.exports = mongoose.model("Profile", ProfileSchema);