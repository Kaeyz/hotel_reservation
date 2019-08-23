const mongoose = require("mongoose");

const userRepository = require("../components/User/userRepository");
const {mongoURI,mongoURI_Test, admin_username } = require("./keys");

let db;

process.env.NODE_ENV === "test" ?
	db = mongoURI_Test : db = mongoURI

const database = {};

database.connect = () => {
	return new Promise((resolve, reject) => {
		mongoose
		.connect(db, { useNewUrlParser: true, useCreateIndex: true })
			.then(() => {
			userRepository
				.addAdminToDB(admin_username)
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