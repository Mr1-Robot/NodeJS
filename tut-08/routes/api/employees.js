// Express.
const express = require("express");
// Router.
const router = express.Router();
// Employees JSON data.
const data = {};
data.employees = require("../../data/employees.json");

// Routes.
router
  .route("/")
  // GET request.
  .get((req, res) => {
    res.json(data.employees);
  })
  // POST request.
  .post((req, res) => {
    res.json({
      username: req.body.username,
      lastname: req.body.lastname,
    });
  })
  // PUT request.
  .put((req, res) => {
    res.json({
      id: req.body.id,
      username: req.body.username,
      lastname: req.body.lastname,
    });
  })
  // DELETE request.
  .delete((req, res) => {
    res.json({
      id: req.body.id,
    });
  });

// Single employee.
router
  .route("/:id")
  // GET request.
  .get((req, res) => {
    res.json({
      id: req.params.id,
    });
  });

module.exports = router;
