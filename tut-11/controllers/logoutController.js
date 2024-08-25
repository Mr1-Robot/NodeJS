// Users DB.
const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (newUsers) {
    this.users = newUsers;
  },
};

// FS Promises.
const fsPromises = require("fs").promises;
// File path utility.
const filePath = require("../utils/filePath");

// Logout handler.
const handleLogout = async (req, res) => {
  // Remove access token on client too.

  // Get cookies.
  const cookies = req.cookies;

  // Check if cookies exist.
  if (!cookies?.jwt) return res.sendStatus(204); // No content.

  // Store cookies token.
  const refreshToken = cookies.jwt;

  // Is refreshToken in DB?
  const foundUser = usersDB.users?.find(
    (usr) => usr.refreshToken === refreshToken
  );

  // Check if user found.
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204); // No content.
  }

  // Filter users DB.
  const otherUsers = usersDB.users?.filter(
    (usr) => usr.refreshToken !== foundUser.refreshToken
  );

  // Current user.
  const currentUser = { ...foundUser, refreshToken: "" };
  // Update usersDB.
  usersDB.setUsers([...otherUsers, currentUser]);
  // Store the new usersDB.
  await fsPromises.writeFile(
    filePath("../models", "users.json"),
    JSON.stringify(usersDB.users)
  );

  // Respone with clear cookie.
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // *On production mode we must add a flaf -> secure: true. It's only serves on https.

  res.sendStatus(204); // No content.
};

module.exports = { handleLogout };
