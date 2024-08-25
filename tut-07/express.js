// Express.
const express = require("express");
// Path.
const path = require("path");
// Cors.
const cors = require("cors");
// Express app.
const app = express();
// Custom logger middleware.
const { logger } = require("./middleware/logEvents");
// Custom erro handler middleware.
const errorHandler = require("./middleware/errorHandler");
// Router middleware.
const router = require("./routes/subdir");
// Fiel path helper.
const filePath = require("./utils/filePath");

// Port.
const PORT = process.env.PORT || 3100;

// MIDDLEWARES.

// Custom logger.
app.use(logger);

// Cross Origin Resource Sharing.
const whiteList = [
  "https://www.mywebsite.com",
  "http://localhost:3100",
  "http://127.0.0.1:3100",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS."));
    }
  },
};

app.use(cors(corsOptions));

// Middleware for urlencoded data "Form Data".
app.use(express.urlencoded({ extended: false }));

// Middleware for JSON.
app.use(express.json());

// Middleware for static files.
app.use(express.static(path.join(__dirname, "/public")));

// Router.
app.use("/subdir", router);

// Get home.
app.get("^/$|/index(.html)?", (req, res) => {
  // res.send("Hello Express!");

  // Send File.
  // res.sendFile("./views/index.html", { root: __dirname });

  // Path approach.
  // res.sendFile(path.join(__dirname, "../views", "index.html"));

  // Function approach.
  res.sendFile(filePath("../views", "index.html"));
});

// Get new-page.html.
app.get("^/new-page(.html)?", (req, res) => {
  res.sendFile(filePath("../views", "new-page.html"));
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
// app.get("/*", (req, res) => {
//   res.status(404).sendFile(filePath("../views", "404.html"));
// });
app.all("*", (req, res) => {
  res.status(404);

  if (req.accepts("html")) res.sendFile(filePath("../views", "404.html"));
  else if (req.accepts("json")) res.json({ error: "404 Not Found." });
  else res.type("txt").send("404 Not Found.");
});

// Custom error handler middleware.
app.use(errorHandler);

// Listen to server requests.
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
