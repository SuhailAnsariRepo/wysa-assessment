const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Route to add a user's nickname
router.post("/nickname/add", userController.addNickname);

// Route to add changes made by the user
router.post("/changes/add", userController.addChanges);

// Route to add user's struggle duration
router.post("/strugleDuration/add", userController.addStrugleDuration);

// Route to add user's sleep time
router.post("/sleepTime/add", userController.addSleepTime);

// Route to add user's wake-up time
router.post("/wakeupTime/add", userController.addWakeUpTime);

// Route to add user's sleep hours
router.post("/sleepHours/add", userController.addSleepHours);

// Route to retrieve user results
router.get("/results/get", userController.getResults);

// Route to delete a user
router.delete("/user", userController.deleteUser);

module.exports = router;
