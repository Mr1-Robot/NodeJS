// Mongoose library.
const mongoose = require("mongoose");
// Mongoose methods.
const { Schema, model } = mongoose;

// Employee model.
const employeeSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
});

module.exports = model("Employee", employeeSchema);
