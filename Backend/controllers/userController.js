const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/userModel.js');

async function registerUser(req, res) {
  const { nickname, password } = req.body;

  const user = await UserModel.findOne({ nickname });

  if (user) {
    return res.status(201).send({ message: "User already exists, please login." });
  }

  bcrypt.hash(password, 5, async (err, hash) => {
    if (err) {
      return res.status(400).send({ message: "Something Went Wrong" });
    }

    try {
      const newUser = new UserModel({
        nickname,
        password: hash,
      });
      await newUser.save();

      // Generate JWT token
      const token = jwt.sign({ username: newUser.nickname }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h', // Token expires in 1 hour (you can adjust the expiration time)
      });

      res.status(200).send({ message: "User Registration Successful", token }); // Include token in the response
    } catch (e) {
      res.status(401).send({ message: "Something Went Wrong" });
    }
  });
}

async function addSleepStruggle(req, res) {
  const { nickname, userResponse } = req.body;
  await UserModel.findOneAndUpdate({ nickname }, { sleepStruggle: userResponse });
  res.status(200).send({
    message: "Sleep Struggle response added",
    displayMessage: "Successful",
  });
}

async function addGoToBed(req, res) {
  const { nickname, userResponse } = req.body;
  await UserModel.findOneAndUpdate({ nickname }, { goTobed: userResponse });
  res.status(200).send({
    message: "Go to bed response added",
    displayMessage: "Successful",
  });
}

async function addGetOutOfBed(req, res) {
  const { nickname, userResponse } = req.body;
  await UserModel.findOneAndUpdate({ nickname }, { getOutofBed: userResponse });
  res.status(200).send({
    message: "Get out of Bed response added",
    displayMessage: "Successful",
  });
}

async function addSleepHours(req, res) {
  const { nickname, userResponse } = req.body;
  await UserModel.findOneAndUpdate({ nickname }, { sleepHours: userResponse });
  res.status(200).send({
    message: "Sleep Hours response added",
    displayMessage: "Successful",
  });
}

async function calculateSleepEfficiency(req, res) {
  const { nickname } = req.body;
  const user = await UserModel.findOne({ nickname });

  const sleepingTime = parseInt(user.goTobed.split(":")[0]);
  const wakingTime = parseInt(user.getOutofBed.split(":")[0]);

  const sleepEfficiency = Math.ceil((user.sleepHours * 100) / (wakingTime - sleepingTime));

  res.status(200).send({ sleepEfficiency, displayMessage: "Successful" });
}

module.exports = {
  registerUser,
  addSleepStruggle,
  addGoToBed,
  addGetOutOfBed,
  addSleepHours,
  calculateSleepEfficiency,
};
