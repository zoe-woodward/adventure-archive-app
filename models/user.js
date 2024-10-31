const mongoose = require("mongoose");

const adventureSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
  },
  memories: {
    type: String,
    required: true,
  },
});
  

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  adventures: [adventureSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
