// Get the usersDB.
const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (newUsers) {
    this.users = newUsers;
  },
};

// Bcrypt.
const bcrypt = require("bcrypt");
// JWT.
const jwt = require("jsonwebtoken");
// Fs promises.
const fsPromises = require("fs").promises;
// File path.
const filePath = require("../utils/filePath");

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
  const foundUser = usersDB.users?.find((usr) => usr.username === user);

  // Return unauthorized if the user not exist in usresDB.
  if (!foundUser) {
    return res.status(401).json({ message: `User ${user} is unauthorized!` });
  }

  // Check is password match.
  const isMatch = await bcrypt.compare(pwd, foundUser.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Wrong password!" });
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
    { expiresIn: "30s" }
  );

  // Create JWT refresh token.
  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  // Other users.
  const otherUsers = usersDB.users.filter(
    (usr) => usr.username !== foundUser.username
  );
  // Save current user with refreshToken.
  const currentUser = { ...foundUser, refreshToken };
  // Set users.
  usersDB.setUsers([...otherUsers, currentUser]);
  // Save new users.
  await fsPromises.writeFile(
    filePath("../models", "users.json"),
    JSON.stringify(usersDB.users)
  );

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
