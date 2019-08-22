const express = require("express");
const app = express();


const userRouter = require("../components/User/userRouter");
const roomRouter = require("../components/Rooms/roomRouter");
const reservationRouter = require("../components/Reservations/reservationRouter");


app.get("/", (req, res) => {
  res.send("Welcome to room reservation backend");
});

app.use("/user", userRouter);
app.use("/room/", roomRouter);
app.use("/reservations/", reservationRouter);

module.exports = app;