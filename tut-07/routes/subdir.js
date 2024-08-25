// Express.
const express = require("express");
// Express router.
const router = express.Router();
// File path helper.
const filePath = require("../utils/filePath");

// Routes.
router.get("^/$|index(.html)?", (req, res) => {
  res.sendFile(filePath("../views/subdir", "index.html"));
});

router.get("/test(.html)?", (req, res) => {
  res.sendFile(filePath("../views/subdir", "test.html"));
});

module.exports = router;
