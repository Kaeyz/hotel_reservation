const express = require("express");
const app = express();


const userRouter = require("../components/User/userRouter");

app.use("/user", userRouter);


module.exports = app;