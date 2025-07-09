const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const profileController = require("../controllers/profileController");

// GET profile
router.get("/", authMiddleware, profileController.getProfile);

// UPDATE profile
router.put("/", authMiddleware, profileController.updateProfile);

module.exports = router;
