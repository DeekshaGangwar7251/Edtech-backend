// models/Tags.js
const mongoose = require("mongoose");

const tagsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Tag", tagsSchema);