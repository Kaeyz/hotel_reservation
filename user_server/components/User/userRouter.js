// receives and redirects all user route request to the appropriate controller.
const express = require("express");
const router = express.Router();

// Import controller
const userController = require("./userController");


router.post("/create", userController.createUserAccount);
router.post("/login", userController.loginUser);
router.post("/admin-create", userController.createAdminAccount);

module.exports = router;