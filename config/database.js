const mongoose = require("mongoose");

const database = {};

database.connect = () => {
	const db = require("./keys").mongoURI;
	mongoose
		.connect(db, { useNewUrlParser: true, useCreateIndex: true })
		.then(() => console.log("Connected to Database Successfully"))
		.catch(err => console.log({ "dbErr": err }));
};


module.exports = database;