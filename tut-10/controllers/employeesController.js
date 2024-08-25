// Employees data.
const data = {
  employees: require("../models/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

// GET employees.
const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

// POST employee.
const createNewEmployee = (req, res) => {
  // Check if the new employee is already exist.
  const existedEmployee = data.employees?.find(
    (emp) =>
      emp.firstname === req.body.firstname && emp.lastname === req.body.lastname
  );

  // Return if the employee is exist with statusCode 400.
  if (existedEmployee) {
    return res
      .status(400)
      .json({ message: "This employee is already exist. " });
  }

  // Employees data length.
  const employeesLength = data.employees?.length;

  // New employee object.
  const newEmployee = {
    id: employeesLength ? data.employees[employeesLength - 1].id + 1 : 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  // Check if the keys are exist in the body.
  if (!req.body.firstname || !req.body.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required." });
  }

  // Set the new employee.
  data.setEmployees([...data.employees, newEmployee]);
  res.status(200).json(data.employees);
};

// PUT employee.
const updateEmployee = (req, res) => {
  // Find employee by ID.
  const employee = data.employees?.find(
    (emp) => emp.id === parseInt(req.body.id)
  );

  // Return error message if not exist.
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee with ID ${req.body.id} not found.` });
  }

  // Set new employee data.
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;

  // Filter the employees data.
  const filteredArray = data.employees?.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );

  // Add the new employee - unsorted.
  const unsortedEmployees = [...filteredArray, employee];

  // Sorted employees data.
  const sortedEmployees = unsortedEmployees.sort((a, b) =>
    a.id > b.id ? 1 : a.id < b.id ? -1 : 0
  );

  // Set the sorted employees.
  data.setEmployees(sortedEmployees);

  // Send the new employees data with statusCode 200.
  res.status(200).json(data.employees);
};

// DELETE employee.
const deleteEmployee = (req, res) => {
  // Find employee by ID.
  const employee = data.employees?.find(
    (emp) => emp.id === parseInt(req.body.id)
  );

  // Return error message if not exist.
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee with ID ${req.body.id} not found.` });
  }

  // Delete the requested employee.
  const filteredEmployees = data.employees?.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );

  // Set the new array.
  data.setEmployees([...filteredEmployees]);

  // Return the new employees data with statusCode 200.
  res.status(200).json(data.employees);
};

/*** Single Employee ***/
// GET employee by ID.
const getEmployeeById = (req, res) => {
  // Find employee by ID.
  const employee = data.employees?.find(
    (emp) => emp.id === parseInt(req.params.id)
  );

  console.log(employee);

  // Return if not exist.
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee with ID ${req.params.id} not found.` });
  }

  // Return the employee with statusCode 200.
  res.status(200).json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
};
