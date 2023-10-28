const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate } = require('../middlewares/authenticate');

// Route to add a user's nickname
router.post("/user/add", authenticate, userController.addUser);

// Route to login user
router.post("/user/login", authenticate, userController.loginUser);

// Route to add changes made by the user
router.post("/changes/add", authenticate, userController.addChanges);

// Route to add user's struggle duration
router.post("/strugleDuration/add", authenticate, userController.addStrugleDuration);

// Route to add user's sleep time
router.post("/sleepTime/add", authenticate, userController.addSleepTime);

// Route to add user's wake-up time
router.post("/wakeupTime/add", authenticate, userController.addWakeUpTime);

// Route to add user's sleep hours
router.post("/sleepHours/add", authenticate, userController.addSleepHours);

// Route to retrieve user results
router.get("/results/get", authenticate, userController.getResults);

// Route to delete a user
router.delete("/user", authenticate, userController.deleteUser);

module.exports = router;
