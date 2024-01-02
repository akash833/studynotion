const mongoose = require("mongoose");

const TagSchema = mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  course:{
    type : mongoose.SchemaTypes.ObjectId,
    ref : "Course"
  }
});

module.exports = mongoose.model("Tag",TagSchema);