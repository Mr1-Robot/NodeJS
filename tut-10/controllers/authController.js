// Get the usersDB.
const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (newUsers) {
    this.users = newUsers;
  },
};

// Bcrypt.
const bcrypt = require("bcrypt");

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

  // Check is password is match.
  const isMatch = await bcrypt.compare(pwd, foundUser.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Wrong password!" });
  }

  // Create JWT token.

  // Return authorized user.
  res.status(200).json({ message: `User ${user} is authorized` });
};

module.exports = { handleLogin };
