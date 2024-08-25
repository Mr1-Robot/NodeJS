// JWT.
const jwt = require("jsonwebtoken");
// Dontenv.
require("dotenv").config();

// Verify JWT handler.
const verifyJWT = (req, res, next) => {
  // Get authorization key.
  const authHeader = req.headers?.authorization || req.headers?.Authorization;

  // Return 401 if no auth header provided.
  if (!authHeader) return res.status(401).json({ message: "Unauthorized!" });
  // Log the auth header.
  // Get token.
  const token = authHeader?.split(" ")?.at(1);
  // Verify JWT token.
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token!" });
    req.user = decoded.username;
    next();
  });
};

module.exports = verifyJWT;
