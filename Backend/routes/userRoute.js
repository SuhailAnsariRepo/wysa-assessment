const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate } = require('../middlewares/authenticate');

router.post("/register", userController.registerUser);
router.post("/sleepStruggle", authenticate, userController.addSleepStruggle);
router.post("/goTobed", authenticate, userController.addGoToBed);
router.post("/getOutofBed", authenticate, userController.addGetOutOfBed);
router.post("/sleepHours", authenticate, userController.addSleepHours);
router.post("/sleepEfficiency", authenticate, userController.calculateSleepEfficiency);

module.exports = router;
