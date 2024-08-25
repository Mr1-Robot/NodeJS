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

  // Path routerroach.
  // res.sendFile(path.join(__dirname, "../views", "index.html"));

  // Function routerroach.
  res.sendFile(filePath("../views", "index.html"));
});

// Get new-page.html.
router.get("^/new-page(.html)?", (req, res) => {
  res.sendFile(filePath("../views", "new-page.html"));
});

// Redirect.
router.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page");
});

module.exports = router;
