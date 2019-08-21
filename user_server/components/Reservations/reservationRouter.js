// receives and redirects all user route request to the appropriate controller.
const express = require("express");
const router = express.Router();

const passport = require("passport");

// Import controller
const reservationController = require("./reservationController");

router.post("/new",
  passport.authenticate("jwt", { session: false }),
  reservationController.createNewReservation);

module.exports = router;