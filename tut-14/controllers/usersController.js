const usersDB = {
  users: require("../models/users.json"),
};

const getAllUsers = async (req, res) => {
  await res.json({ data: usersDB.users });
};

module.exports = { getAllUsers };
