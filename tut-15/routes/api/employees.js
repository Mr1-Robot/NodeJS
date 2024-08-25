// Express.
const express = require("express");
// Router.
const router = express.Router();
// Roles list.
const ROLES_LIST = require("../../config/rolesList");
// Verify roles middleware.
const verifyRoles = require("../../middleware/verifyRoles");

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
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewEmployee)

  // PUT request.
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee)

  // DELETE request.
  .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee);

// Single employee.
router
  .route("/:id")
  // GET request.
  .get(getEmployeeById);

module.exports = router;
