const express = require("express");
const app = express();


const userRouter = require("../components/User/userRouter");
const roomRouter = require("../components/Rooms/roomRouter");


app.use("/user", userRouter);
app.use("/room/", roomRouter);

module.exports = app;