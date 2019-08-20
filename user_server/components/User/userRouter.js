// receives and redirects all user route request to the appropriate controller.
const express = require("express");
const router = express.Router();

const passport = require("passport");

//import authorization
const authorize = require("../authorizations");

// Import controller
const userController = require("./userController");


router.post("/create", userController.createUserAccount);
router.post("/login", userController.loginUser);
router.post("/admin-create", userController.createAdminAccount);
router.post("/point/update",
  passport.authenticate("jwt", { session: false }),
  authorize.isAdmin,
  userController.updatePoint);

module.exports = router;