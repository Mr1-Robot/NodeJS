// Express.
const express = require("express");
// Express router.
const router = express.Router();
// File path helper.
const filePath = require("../utils/filePath");

// Get home.
router.get("^/$|/index(.html)?", (req, res) => {
  // res.send("Hello Express!");

  // Send File.
  // res.sendFile("./views/index.html", { root: __dirname });

  // Path router aproach.
  // res.sendFile(path.join(__dirname, "../views", "index.html"));

  // Function routerroach.
  res.sendFile(filePath("../views", "index.html"));
});

module.exports = router;
