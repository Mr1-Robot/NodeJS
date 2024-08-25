// User Model.
const UserModel = require("../models/User");
// Bcrypt.
const bcrypt = require("bcrypt");
// JWT.
const jwt = require("jsonwebtoken");

// Login handler.
const handleLogin = async (req, res) => {
  // Get credientials.
  const { user, pwd } = req.body;
  // Return if no data provided.
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required!" });
  }

  // Check if the user does exist.
  const foundUser = await UserModel.findOne({ username: user }).exec();

  // Return unauthorized if the user not exist in usresDB.
  if (!foundUser) {
    return res.status(401).json({ message: `User ${user} is unauthorized!` });
  }

  // Check is password match.
  const isMatch = await bcrypt.compare(pwd, foundUser.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Wrong credentials!" });
  }

  // Roles.
  const userRoles = Object.values(foundUser.roles);

  // Create JWT access token.
  const accessToken = jwt.sign(
    {
      userInfo: {
        username: foundUser.username,
        roles: userRoles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "50s" }
  );

  // Create JWT refresh token.
  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  // Save refreshToken with currentUser.
  foundUser.refreshToken = refreshToken;
  const result = await foundUser.save();
  console.log(result);

  // Store accessToken in cookie with httpOnly.
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: "None",
  });

  // Return new user.
  res.status(200).json({ accessToken });
};

module.exports = { handleLogin };
