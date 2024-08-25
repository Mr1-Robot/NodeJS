// User Model.
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");

// GET all users.
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    // Check if users found.
    if (!allUsers) return res.status(204).json({ message: "No users found!" });

    res.status(200).json({ data: allUsers });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Update user.
const updateUser = async (req, res) => {
  // Check if no data provided.
  if (!req?.body || !req?.body?.id)
    return res.status(400).json({ message: "No data provided." });

  // Check foundUser.
  const foundUser = await UserModel.findById(req.body.id).exec();
  if (!foundUser) return res.status(400).json({ message: "User not found!" });

  try {
    if (req.body.username) {
      const formmatedUsername = req.body.username.split(" ").join("_");
      await foundUser.updateOne({ username: formmatedUsername });
    }

    if (req.body.roles) {
      await foundUser.updateOne({ roles: req.body.roles });
    }

    if (req.body.pwd) {
      const hashedPassword = await bcrypt.hash(req.body.pwd, 10);
      await foundUser.updateOne({ password: hashedPassword });
    }

    const updatedUser = await UserModel.findById(req.body.id).exec();
    res.status(200).json({ data: updatedUser });

    // Catch error.
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  // Return if no user id provided.
  if (!req?.body?.id)
    return res.status(400).json({ message: "User ID is required!" });

  // Find user.
  const foundUser = await UserModel.findById(req.body.id).exec();

  if (!foundUser)
    return res
      .status(404)
      .json({ message: `User with ID ${req.body.id} not found.` });

  try {
    await foundUser.deleteOne();

    // Respond with success.
    res
      .status(200)
      .json({ message: `${foundUser.username} deleted successfully.` });

    // Catch err.
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAllUsers, updateUser, deleteUser };
