// Express.
const express = require("express");
const router = express.Router();
const { handleNewUser } = require("../controllers/registerController");

// Route.
router.post("/", handleNewUser);

module.exports = router;
