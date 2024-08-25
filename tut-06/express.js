// Express.
const express = require("express");
// Path.
const path = require("path");
// App.
const app = express();

// Port.
const PORT = process.env.PORT || 3100;

// Fiel path helper.
const filePath = (dir, file) => {
  return path.join(__dirname, dir, file);
};

// Get home.
app.get("^/$|/index(.html)?", (req, res) => {
  // res.send("Hello Express!");

  // Send File.
  // res.sendFile("./views/index.html", { root: __dirname });

  // Path approach.
  // res.sendFile(path.join(__dirname, "views", "index.html"));

  // Function approach.
  res.sendFile(filePath("views", "index.html"));
});

// Get new-page.html.
app.get("^/new-page(.html)?", (req, res) => {
  res.sendFile(filePath("views", "new-page.html"));
});

// Redirect.
app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page");
});

// Chaining route handlers.
const one = (req, res, next) => {
  console.log("One.");
  next();
};

const two = (req, res, next) => {
  console.log("Two.");
  next();
};

const three = (req, res, next) => {
  console.log("Three.");
  res.send("Finished!");
};

app.get("/chain(.html)?", [one, two, three]);

// Catch all.
app.get("/*", (req, res) => {
  res.status(404).sendFile(filePath("views", "404.html"));
});

// Listen to server requests.
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
