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
				.then((res) => {
					console.log("Connected to Database Successfully");
					resolve(res);
				});
		})
		.catch(err => {
			console.log({ "dbErr": err });
			reject(err);
		});
	});
};

database.disconnect = () => {
	return mongoose.disconnect();
}

database.delete = () => {
	return mongoose.connection.db.dropDatabase();
};


module.exports = database;