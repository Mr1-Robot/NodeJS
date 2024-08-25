// Express.
const express = require("express");
// Express router.
const router = express.Router();

// Auth controller.
const { handleLogin } = require("../controllers/authController");

// Route.
router.post("/", handleLogin);

module.exports = router;
