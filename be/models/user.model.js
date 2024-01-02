const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNo: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["Student", "Instructor", "Admin"],
    required: true,
  },
  active: {
    type: Boolean,
  },
  Approve: {
    type: Boolean,
  },
  image: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Course",
  },
  additionalDetails: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Profile",
  },
  courseProgress: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "CourseProgress",
  },
});

module.exports = mongoose.model("User", UsersSchema);
