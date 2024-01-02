const mongoose = require("mongoose");

const CoursesSchema = mongoose.Schema({
  courseName: {
    type: String,
  },
  courseDescription: {
    type: String,
  },
  instructor: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  whatYouLearn: [],
  courseContent: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Section",
    },
  ],
  ratingAndReviews: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "ratingAndReviews",
    },
  ],
  price: {
    type: Number,
  },
  thumbnail: {
    type: String,
  },
  createdAt: {
    type: date,
    default: Date.now(),
  },
  language: {
    type: String,
  },
  courseInclude: [],
  tag: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Tag",
  },
  studentEnrolled: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      required:true,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Course", CoursesSchema);
