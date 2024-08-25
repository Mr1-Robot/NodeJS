const logEvents = require("./logEvents");
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

// Init object.
const myEmitter = new MyEmitter();

// Listen to log event.
myEmitter.on("log", (msg) => logEvents(msg));

setTimeout(() => {
  myEmitter.emit("log", "Event log emitted.");
}, 2000);
