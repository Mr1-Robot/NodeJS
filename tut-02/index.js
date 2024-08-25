const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const filePath = (file) => {
  return path.join(__dirname, "files", file);
};

// const fileOps = async () => {
//   try {
//     // Read starter.txt file.
//     const data = await fsPromises.readFile(filePath("starter.txt"), "utf8");

//     // Unlink the file.
//     await fsPromises.unlink(filePath("starter.txt"));

//     // Write promisesWrite.txt file.
//     await fsPromises.writeFile(filePath("promisesWrite.txt"), data);

//     // Append message to promisesWrite.txt file.
//     await fsPromises.appendFile(
//       filePath("promisesWrite.txt"),
//       `\n\nNice to meet you.`
//     );

//     // Rename promisesWrite.txt file to promisesComplete.txt.
//     await fsPromises.rename(
//       filePath("promisesWrite.txt"),
//       filePath("promisesComplete.txt")
//     );

//     // Read the new file, promisesComplete.txt.
//     const newData = await fsPromises.readFile(
//       filePath("promisesComplete.txt"),
//       "utf8"
//     );
//     console.log(newData);

//     console.log(data);
//   } catch (err) {
//     console.error(err);
//   }
// };

// fileOps();

// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "Nice to meet you, Muammar.",
//   (err) => {
//     if (err) throw err;
//     console.log("File written.");

//     // Append file.
//     fs.appendFile(
//       path.join(__dirname, "files", "reply.txt"),
//       "\n\nYes it is.",
//       (err) => {
//         if (err) throw err;
//         console.log("File appended.");

//         // Rename file.
//         fs.rename(
//           path.join(__dirname, "files", "reply.txt"),
//           path.join(__dirname, "files", "newReply.txt"),
//           (err) => {
//             if (err) throw err;
//             console.log("File renamed.");
//           }
//         );
//       }
//     );
//   }
// );

// Create read stream.
const rs = fs.createReadStream(filePath("lorem.txt"), { encoding: "utf8" });
// Create write stream.
const ws = fs.createWriteStream(filePath("new-lorem.txt"));

// Listen to read strean.
// rs.on("data", (dataChunk) => {
//   ws.write(dataChunk);
// });

// Another listen approach.
rs.pipe(ws);

// Exit on uncaught errors.
process.on("uncaughtException", (err) => {
  console.log(`There was an uncaught error: ${err}`);
  process.exit(1);
});
