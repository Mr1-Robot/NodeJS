const http = require("http");
const logEvents = require("./logEvents");
const EventEmitter = require("events");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

class Emitter extends EventEmitter {}

// Init object.
const myEmitter = new Emitter();
// Listen to log event.
myEmitter.on("log", (msg, fileName) => logEvents(msg, fileName));

// Port.
const PORT = process.env.PORT || 3100;

// Serve file to response.
const serveFile = async (filePath, contentType, response) => {
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      "utf8",
      !contentType.includes("image") ? "utf8" : ""
    );
    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;
    response.writeHead(filePath.includes("404.html") ? 404 : 200, {
      "Content-Type": contentType,
    });
    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (err) {
    console.log(err);
    myEmitter.emit("log", `${err.name}: ${err.message}`, "errLog.txt");

    response.statusCode = 500;
    response.end();
  }
};

// Create server.
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  myEmitter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");

  // let filePath;

  // if (req.url === "/" || req.url === "index.html") {
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "text/html");
  //   filePath = path.join(__dirname, "views", "index.html");

  //   fs.readFile(filePath, "utf8", (err, data) => {
  //     res.end(data);
  //   });
  // }

  // Switch approach.
  // switch (req.url) {
  //   case "/" || "index.html":
  //     res.statusCode = 200;
  //     res.setHeader("Content-Type", "text/html");
  //     filePath = path.join(__dirname, "views", "index.html");

  //     fs.readFile(filePath, "utf8", (err, data) => {
  //       res.end(data);
  //     });
  //     break;
  // }

  const extension = path.extname(req.url);
  let contentType;

  // switch(req.url) {
  //   case ''
  // }

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "text/jpeg";
      break;
    case ".png":
      contentType = "text/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;

    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  // Making the .html extension not required in the url.
  if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

  // Check if file path does exist.
  const fileExists = fs.existsSync(filePath);
  if (fileExists) {
    // Serve the file.
    serveFile(filePath, contentType, res);
  } else {
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { location: "/" });
        res.end();
        break;
      default:
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

// Listen to server requests.
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
