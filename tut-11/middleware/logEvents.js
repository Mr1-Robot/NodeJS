const fs = require("fs");
const fsPromises = require("fs").promises;
const { join } = require("path");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

// Log event function.
const logEvents = async (message, fileName) => {
  const dateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss a");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  try {
    if (!fs.existsSync(join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(join(__dirname, "..", "logs"));
    }

    await fsPromises.appendFile(
      join(__dirname, "..", "logs", fileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

// Logger.
const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  next();
};

module.exports = { logger, logEvents };
