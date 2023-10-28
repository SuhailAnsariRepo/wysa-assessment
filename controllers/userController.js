const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const addNickname = asyncHandler(async (req, res) => {
  try {
    const { nickname } = req.body;

    const user = new User({nickname});
    const savedUser = await user.save();

    res.json({ id: savedUser._id, message: "User Created Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const addChanges = asyncHandler(async (req, res) => {
  try {
    const { id, changes } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    user.changes.push(...changes);
    await user.save();

    res.json({ message: "Changes Added Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const addStrugleDuration = asyncHandler(async (req, res) => {
  try {
    const { id, struggle } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    user.struggleDuration = struggle;
    await user.save();

    res.json({ message: "Struggle Added Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const addSleepTime = asyncHandler(async (req, res) => {
  try {
    const { id, sleepTime } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    user.bedTime = sleepTime;
    await user.save();

    res.json({ message: "Sleep time Added Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const addWakeUpTime = asyncHandler(async (req, res) => {
  try {
    const { id, wakeupTime } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    user.wakeUpTime = wakeupTime;
    await user.save();

    res.json({ message: "Sleep time Added Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const addSleepHours = asyncHandler(async (req, res) => {
  try {
    const { id, sleepHours } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    user.sleepingHours = sleepHours;
    await user.save();

    res.json({ message: "Sleep time Added Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

function getSleepHealthScore(
  bedTime,
  wakeUpTime,
  sleepingHours,
  changes,
  struggleDuration
) {
  let score = 0;

  const [bedHour, bedMinute] = bedTime.split(":").map(Number);
  const [wakeUpHour, wakeUpMinute] = wakeUpTime.split(":").map(Number);
  const sleepDuration =
    (wakeUpHour - bedHour) * 60 + (wakeUpMinute - bedMinute);

  if (sleepingHours >= 7 && sleepingHours <= 9) {
    score += 25;
  }

  for (let i = 0; i < changes.length; i++) {
    if (changes[i] === "fallAsleep") {
      score += 25;
    } else if (changes[i] === "sleepThroughNight") {
      score += 25;
    } else if (changes[i] === "wakeUpRefreshed") {
      score += 25;
    }
  }

  if (struggleDuration === "Less than 2 weeks") {
    score -= 10;
  } else if (struggleDuration === "2 to 8 weeks") {
    score -= 20;
  } else if (struggleDuration === "More than 8 weeks") {
    score -= 30;
  }

  if (sleepingHours < 6 || sleepingHours > 9) {
    score -= 20;
  }

  if (sleepDuration > 0 && (sleepingHours * 60) / sleepDuration < 0.85) {
    score -= 20;
  }

  return score;
}

const getResults = asyncHandler(async (req, res) => {
  try {
    const { id } = req.query;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const score = getSleepHealthScore(
      user.bedTime,
      user.wakeUpTime,
      user.sleepingHours,
      user.changes,
      user.struggleDuration
    );

    res.json({ nickname: user.nickname, sleepHealthScore: score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.query;

  const user = await User.findById(id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

module.exports = {
  addNickname,
  addChanges,
  addStrugleDuration,
  addSleepTime,
  addWakeUpTime,
  addSleepHours,
  getResults,
  deleteUser,
};