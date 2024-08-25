// User Model.
const EmployeeModel = require("../models/Employee");

// GET employees.
const getAllEmployees = async (req, res) => {
  // Check if there is no employees.
  const employees = await EmployeeModel.find();
  if (!employees) return res.send(204).json({ message: "No employees found." });

  // responed with employees.
  res.send(employees);
};

// POST employee.
const createNewEmployee = async (req, res) => {
  // Return if no data provided.
  if (!req?.body?.firstname || !req?.body?.lastname)
    return res
      .send(400)
      .json({ message: "Employee first, and last names are required." });

  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  // Check if the new employee is already exist.
  const foundEmployee = await EmployeeModel.findOne({
    firstname,
    lastname,
  }).exec();

  // Return if the employee is exist with statusCode 400.
  if (foundEmployee) {
    return res
      .status(400)
      .json({ message: "This employee is already exist. " });
  }

  try {
    // Create and store new employee.
    const result = await EmployeeModel.create({
      firstname,
      lastname,
    });

    res
      .status(200)
      .json({ data: result, message: "Employee created sucessfully." });

    // Catch if err occurred.
  } catch (err) {
    console.error(err);
  }
};

// PUT employee.
const updateEmployee = async (req, res) => {
  // Return if no ID provided.
  if (!req?.body?.id)
    return res.send(400).json({ message: "Employee ID is required." });

  const foundEmployee = await EmployeeModel.findById(req.body.id).exec();

  // Return employee not found.
  if (!foundEmployee) {
    return res
      .status(400)
      .json({ message: `Employee with ID ${req.body.id} not found.` });
  }

  try {
    const result = await foundEmployee.updateOne({
      firstname: req.body.firstname ? req.body.firstname : "",
      lastname: req.body.lastname ? req.body.lastname : "",
    });
    console.log(result);
    res.status(200).json({
      status: result.acknowledged ? "Success" : "Failed",
      message: "Updated successfully.",
    });

    // Catch if err occurred.
  } catch (err) {
    console.error(err);
  }
};

// DELETE employee.
const deleteEmployee = async (req, res) => {
  // Return if no ID provided.
  if (!req?.body?.id)
    return res.status(400).json({ message: "Employee ID is required!" });

  // Find employee by ID.
  const foundEmployee = await EmployeeModel.findById(req.body.id).exec();

  // Return if employee not found.
  if (!foundEmployee) {
    return res
      .status(400)
      .json({ message: `Employee with ID ${req.body.id} not found.` });
  }

  try {
    // Delete the requested employee.
    const result = await foundEmployee.deleteOne();
    console.log(result);
    res.status(200).json({
      status: result.acknowledged ? "Success" : "Failed",
      message: `Employee ${req.body.id} deleted successfully.`,
    });
  } catch (err) {
    console.error(err);
  }
};

/*** Single Employee ***/
// GET employee by ID.
const getEmployeeById = async (req, res) => {
  // Return if no id provided.
  if (!req?.params?.id)
    return res.status(400).json({ message: "Employee ID is required." });

  console.log(req.params.id);

  try {
    // Check if the employee exists.
    const foundEmployee = await EmployeeModel.findById(req.params.id).exec();

    console.log(foundEmployee);

    // Return if employee not found.
    if (!foundEmployee)
      return res
        .status(404)
        .json({ message: `Employee with ID ${req.params.id} not found.` });

    // Respond with foundEmployee.
    res.status(200).json({ data: foundEmployee });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
};
