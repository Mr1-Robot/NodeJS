const path = require("path");
const os = require("os");
const { add, sub, mult, div } = require("./math");

// console.log(__dirname);
// console.log(__filename);

// console.log(path.basename(__filename));
// console.log(path.dirname(__filename));
// console.log(path.parse(__filename));

// console.log(os.version());
// console.log(os.type());
// console.log(os.homedir());

console.log(add(1, 2)); // 3
console.log(sub(1, 2)); // -1
console.log(mult(1, 2)); // 2
console.log(div(1, 2)); // 0.5
