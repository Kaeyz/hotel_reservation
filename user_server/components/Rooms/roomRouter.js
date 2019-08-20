// receives and redirects all user route request to the appropriate controller.
const express = require("express");
const router = express.Router();
const passport = require("passport");


const authorize = require("../authorizations");


// Import controller
const roomController = require("./roomController");


router.post("/create",
  passport.authenticate("jwt", { session: false }),
  authorize.isAdmin,
  roomController.createRoom);

module.exports = router;