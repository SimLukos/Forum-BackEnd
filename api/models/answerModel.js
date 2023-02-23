const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
  author: { type: String, required: true },
  answer: { type: String, required: true },
  date: { type: String, required: true },
  questionId: { type: String, required: true },
  rating: { type: Number, required: true, default: 0 },
  liked: { type: Array, required: true },
  disliked: { type: Array, required: true },
});

module.exports = mongoose.model("Answer", answerSchema);
