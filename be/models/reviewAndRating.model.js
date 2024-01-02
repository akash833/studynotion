const mongoose = require("mongoose");

const ReviewAndRatingSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
  },
  courseId:{
    type : mongoose.SchemaTypes.ObjectId,
    ref : "Course"
  }
});

module.exports = mongoose.model("ReviewAndRating",ReviewAndRatingSchema);
