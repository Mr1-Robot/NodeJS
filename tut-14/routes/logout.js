// Express.
const express = require("express");
// Express router.
const router = express.Router();
// Logout controller.
const { handleLogout } = require("../controllers/logoutController");

// Route.
router.get("/", handleLogout);

module.exports = router;
