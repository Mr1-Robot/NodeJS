// Dotenv.
require("dotenv").config();
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
// Verify JWT middleware.
const verifyJWT = require("./middleware/verifyJWT");
// Credentials middleware.
const credentials = require("./middleware/credentials");
// Mongoose.
const mongoose = require("mongoose");
// Connect DB config.
const connectDB = require("./config/dbConnect");
// CookieParser.
const cookieParser = require("cookie-parser");
// Fiel path helper.
const filePath = require("./utils/filePath");

// Port.
const PORT = process.env.PORT || 3100;

// Connect to DB.
connectDB();

// MIDDLEWARES.
// Custom logger.
app.use(logger);

// Handle options credentials check before CORS.
app.use(credentials);

// Cross Origin Resource Sharing.
app.use(cors(corsOptions));

// Middleware for urlencoded data "Form Data".
app.use(express.urlencoded({ extended: false }));

// Middleware for JSON.
app.use(express.json());

// Middleware for cookie parser.
app.use(cookieParser());

// Middleware for static files [default].
app.use("/", express.static(path.join(__dirname, "/public")));

/*** ROUTERS ***/
// Root.
app.use("/", require("./routes/root"));
// Register.
app.use("/register", require("./routes/register"));
// Auth.
app.use("/auth", require("./routes/auth"));
// Refresh token.
app.use("/refresh", require("./routes/refresh"));
// Logout.
app.use("/logout", require("./routes/logout"));

/** REQUIRE JWT TOKEN **/
app.use(verifyJWT);

// Employees.
app.use("/employees", require("./routes/api/employees"));

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

// Listen if DB connected.
mongoose.connection.once("open", () => {
  console.log("Connected to DB.");
  // Listen for server requests.
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
