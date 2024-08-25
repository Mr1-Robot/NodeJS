// JWT.
const jwt = require("jsonwebtoken");
// Dontenv.
require("dotenv").config();

// Verify JWT handler.
const verifyJWT = (req, res, next) => {
  // Get authorization key.
  const authHeader = req.headers?.authorization || req.headers?.Authorization;

  // Return 401 if no auth header provided.
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized!" });

  // Get token.
  const token = authHeader?.split(" ")?.at(1);

  // Verify JWT token.
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token!" });
    req.user = decoded.userInfo.username;
    req.roles = decoded.userInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
