// User Model.
const UserModel = require("../models/User");
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
  const foundUser = await UserModel.findOne({ refreshToken }).exec();

  // Check if user found.
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204); // No content.
  }

  // Clear the refreshToken.
  foundUser.refreshToken = "";

  // Update DB.
  const result = await foundUser.save();
  console.log(result);

  // responed with clear cookie.
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // *On production mode we must add a flaf -> secure: true. It's only serves on https.

  res.sendStatus(204); // No content.
};

module.exports = { handleLogout };
