const mongoose = require("mongoose");

const userRepository = require("../components/User/userRepository");

let db;

if (process.env.NODE_ENV === "test") {
	db = require("./keys").mongoURI_Test;
} else {
	db = require("./keys").mongoURI
}

const database = {};

database.connect = () => {
	return new Promise((resolve, reject) => {
		mongoose
		.connect(db, { useNewUrlParser: true, useCreateIndex: true })
		.then(() => {
			userRepository
				.addAdminToDB()
				.then(() => {
					console.log("Connected to Database Successfully");
					resolve();
				});
		})
		.catch(err => {
			console.log({ "dbErr": err });
			reject;
		});
	});
};

database.disconnect = () => {
	return mongoose.disconnect();
}

database.delete = (database) => {
	return database.connection.db.dropDatabase();
};


module.exports = database;