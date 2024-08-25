// User model.
const UserModel = require("../models/User");
// Bcrypt package.
const bcrypt = require("bcrypt");

// New user creattion handler.
const handleNewUser = async (req, res) => {
  // Get username and password.
  const { user, pwd } = req.body;

  // Return if no data.
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  // Remove any spaces.
  const formmatedUsername = user?.split(" ").join("_");

  // Check duplication.
  const duplication = await UserModel.findOne({ username: user }).exec();
  if (duplication) {
    return res.status(409).json({ message: "Username already exist." });
  }

  // Try to store the new user.
  try {
    // Encrypt password.
    const hashedPassword = await bcrypt.hash(pwd, 10);

    // Create and store the new user in MongoDB.
    const result = await UserModel.create({
      username: formmatedUsername,
      password: hashedPassword,
    });

    console.log(result);

    res
      .status(201)
      .json({ message: `User ${formmatedUsername} created successfully.` });

    // Catch error.
  } catch (err) {
    res.status(500).json({ message: `An error occurred ${err.message}` });
  }
};

module.exports = { handleNewUser };
