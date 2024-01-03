const mongoose = require("mongoose");

const SectionSchema = mongoose.Schema({
  sectionName: {
    type: String,
  },
  subSection: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "SubSection",
    },
  ],
});

module.exports = mongoose.model("Section", SectionSchema);
