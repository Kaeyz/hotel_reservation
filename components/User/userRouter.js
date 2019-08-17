// receives and redirects all user route request to the appropriate controller.
const express = require("express");


const router = express.Router();

router.get("/", (req, res) => {
  return console.log("i am working");
});


module.exports = router;