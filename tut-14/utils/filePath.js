const { join } = require("path");

const filePath = (dir, file) => {
  return join(__dirname, dir, file);
};

module.exports = filePath;
