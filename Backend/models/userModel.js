const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    nickname: { type: String, required: true },
    password: { type: String, required: true },
    sleepStruggle: { type: String, default: "" },
    goTobed: { type: String, default: "" },
    getOutofBed: { type: String, default: "" },
    sleepHours: { type: String, default: "" },
    sleepEfficiency: { type: Number, default: 0 },
    sleepChange: [{ type: String }],
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
