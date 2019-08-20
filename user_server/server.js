const dotenv      = require("dotenv");
const express     = require("express");
const passport    = require('passport');
const bodyParser  = require("body-parser");


// configure variable.env
dotenv.config({ path: ".env" });



//config files
const keys     = require("./config/keys");
const database = require("./config/database");
const routes   = require("./config/routes");


// initialize express
const app = express();


// connect to database
database.connect();

// body parser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport Middleware
require("./config/passport")(passport);


// Connect to routes
app.use("/", routes);


const port = keys.port;

app.listen(port, () => console.log(`server running on ${keys.host}:${port}`));