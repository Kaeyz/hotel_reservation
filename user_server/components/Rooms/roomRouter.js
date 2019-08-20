// receives and redirects all user route request to the appropriate controller.
const express = require("express");
const router = express.Router();


// Import controller
const roomController = require("./roomController");


router.post("/create", roomController.createRoom);

module.exports = router;