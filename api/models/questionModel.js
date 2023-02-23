const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  author: { type: String, required: true },
  date: { type: String, required: true },
  topic: { type: String, required: true },
  answers: { type: Array, required: true },
});

module.exports = mongoose.model("Question", questionSchema);
