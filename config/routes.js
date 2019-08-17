const express = require("express");
const app = express();


app.use("/", (req, res) => {
  console.log("Welcome to this app");
});


module.exports = app;