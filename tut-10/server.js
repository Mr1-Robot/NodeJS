// Express.
const express = require("express");
// Path.
const path = require("path");
// Cors.
const cors = require("cors");
// Custom cors options.
const corsOptions = require("./config/corsOptions");
// Express app.
const app = express();
// Custom logger middleware.
const { logger } = require("./middleware/logEvents");
// Custom erro handler middleware.
const errorHandler = require("./middleware/errorHandler");
// Fiel path helper.
const filePath = require("./utils/filePath");

// Port.
const PORT = process.env.PORT || 3100;

// MIDDLEWARES.

// Custom logger.
app.use(logger);

// Cross Origin Resource Sharing.

app.use(cors(corsOptions));

// Middleware for urlencoded data "Form Data".
app.use(express.urlencoded({ extended: false }));

// Middleware for JSON.
app.use(express.json());

// Middleware for static files [default].
app.use("/", express.static(path.join(__dirname, "/public")));

/*** ROUTERS ***/
// Root.
app.use("/", require("./routes/root"));
// Register.
app.use("/register", require("./routes/register"));
// Employees.
app.use("/employees", require("./routes/api/employees"));
// Auth.
app.use("/auth", require("./routes/auth"));

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
