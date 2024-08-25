// Users DB.
const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (newUsers) {
    this.users = newUsers;
  },
};
// Json web token.
const jwt = require("jsonwebtoken");

// Refresh token handler.
const handleRefreshToken = (req, res) => {
  // Get cookies.
  const cookies = req.cookies;

  // Check if cookies exists.
  if (!cookies?.jwt)
    return res
      .status(401)
      .json({ message: "Unauthorized! Cookies are missing." });

  // Store cookies into refreshToken varaible.
  const refreshToken = cookies.jwt;

  // Find user with refreshToken.
  const foundUser = usersDB.users?.find(
    (usr) => usr.refreshToken === refreshToken
  );

  // Check if user exists.
  if (!foundUser) return res.sendStatus(403);

  // Evaluate JWT.
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    // Check if error.
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);

    // User roles.
    const userRoles = Object.values(foundUser.roles);

    // Sign a new accessToken.
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: foundUser.username,
          roles: userRoles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    // Send the new accessToken.
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
