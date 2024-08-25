// Express.
const express = require("express");
// Express router.
const router = express.Router();

// Refresh controller.
const { handleRefreshToken } = require("../controllers/refreshController");

router.get("/", handleRefreshToken);

module.exports = router;
