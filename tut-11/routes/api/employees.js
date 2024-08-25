// Express.
const express = require("express");
// Router.
const router = express.Router();
// Verify JWT middleware.
const verifyJWT = require("../../middleware/verifyJWT");

// Employees controller.
const {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
} = require("../../controllers/employeesController");

// Routes.
router
  .route("/")
  // GET request.
  .get(getAllEmployees)

  // POST request.
  .post(createNewEmployee)

  // PUT request.
  .put(updateEmployee)

  // DELETE request.
  .delete(deleteEmployee);

// Single employee.
router
  .route("/:id")
  // GET request.
  .get(getEmployeeById);

module.exports = router;
