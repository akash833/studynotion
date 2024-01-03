const mongoose = require("mongoose");

const CourseProgressSchema = mongoose.Schema({
  courseId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Course",
  },
  completedVideos: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "SubSection",
  }],
});

module.exports = mongoose.model("CourseProgress", CourseProgressSchema);