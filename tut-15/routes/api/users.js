// Express.
const express = require("express");
// Express router.
const router = express.Router();
// Users controller.
const {
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../../controllers/usersController");
// Roles list.
const ROLES_LIST = require("../../config/rolesList");
// Verify roles middleware.
const verifyRoles = require("../../middleware/verifyRoles");

// Routes.
router
  .route("/")
  // GET req.
  .get(verifyRoles(ROLES_LIST.Admin), getAllUsers)
  // PUT req.
  .put(verifyRoles(ROLES_LIST.Admin), updateUser)
  // DELETE req.
  .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

module.exports = router;
