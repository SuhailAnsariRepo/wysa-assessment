const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  changes: {
    type: [String],
  },
  struggleDuration: {
    type: String,
  },
  bedTime: {
    type: String,
  },
  wakeUpTime: {
    type: String,
  },
  sleepingHours: {
    type: Number,
  },
  score: {
    type: Number,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;