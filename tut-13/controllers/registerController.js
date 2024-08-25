// File path utility.
const filePath = require("../utils/filePath");

// Initial userDB.
const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (newData) {
    this.users = newData;
  },
};

// File system promises.
const fsPromises = require("fs").promises;
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
  const duplication = usersDB.users?.find(
    (usr) => usr.username === formmatedUsername
  );

  if (duplication) {
    return res.status(409).json({ message: "Username already exist." });
  }

  // Try to store the new user.
  try {
    // Encrypt password.
    const hashedPassword = await bcrypt.hash(pwd, 10);

    // Store new user.
    const newUser = {
      username: formmatedUsername,
      roles: { user: 2001 },
      password: hashedPassword,
    };
    usersDB.setUsers([...usersDB.users, newUser]);

    // Write it to DB file.
    await fsPromises.writeFile(
      filePath("../models", "users.json"),
      JSON.stringify(usersDB.users)
    );
    console.log(usersDB.users);

    res
      .status(201)
      .json({ message: `User ${formmatedUsername} created successfully.` });

    // Catch error.
  } catch (err) {
    res.status(500).json({ message: `An error occurred ${err.message}` });
  }
};

module.exports = { handleNewUser };
