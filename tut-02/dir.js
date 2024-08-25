const fs = require("fs");
const { join } = require("path");

// Check if the directory already eixsts.
if (!fs.existsSync(join(__dirname, "new"))) {
  // Make new directory.
  fs.mkdir(join(__dirname, "/new"), (err) => {
    if (err) throw err;
    console.log("Directory created.");
  });
}

// Remove directory.
fs.rmdir(join(__dirname, "new"), (err) => {
  if (err) throw err;
  console.log("Directory removed.");
});
