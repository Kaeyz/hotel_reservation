const dotenv = require("dotenv");
const express = require("express");


// configure variable.env
dotenv.config({ path: ".env" });


//config files
const keys = require("./config/keys");
const database = require("./config/database");


// initialize express
const app = express();


// connect to database
database.connect();




const port = keys.port;

app.listen(port, () => console.log(`server running on ${keys.host}:${port}`));