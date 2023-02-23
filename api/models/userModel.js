const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true, min: 3 },
  email: { type: String, required: true },
  password: { type: String, required: true, min: 15 },
});

module.exports = mongoose.model("User", userSchema);
