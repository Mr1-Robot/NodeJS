const { logEvents } = require("./logEvents");

const errorHandler = (err, req, res, next) => {
  logEvents(`Error: ${err.message}`, "errLog.txt");
  res.status(500).send(err.message);
};

module.exports = errorHandler;
