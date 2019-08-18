const User = require("./User");


/**
 * @description Handles all database tasks and queries related to the account model.
 */
const userRepository = {};

/**
 * @description Finds a specific user fromm the database using the userID
 * @requires user_Id
 * @returns Returns user matching the user_Id
 */
userRepository.findUserById = (userId) => {
	return new Promise((resolve, reject) => {
		User
			.findById(userId)
			.then(user => {
				return resolve(user);
			})
			.catch(err => {
				return reject(err);
			});
	});
};


/**
 * @description creates a new instance of an user and saves it to the database
 * @requires user_Details
 * @returns New user created
 */
userRepository.createUser = (userOptions) => {
	return new Promise((resolve) => {
		const newUser = new User({
			username: userOptions.username,
			role: "USER",
			points: 250
		});
		return resolve(newUser);
	});
};


/**
 * @description Finds a specific account from the database using account Username
 * @requires Account_Username
 * @returns Returns user matching the account username
 */
userRepository.findAccountByUsername = (username) => {
	return new Promise((resolve, reject) => {
		User
			.findOne({
				username
			})
			.then(user => {
				return resolve(user);
			})
			.catch(err => {
				return reject(err);
			});
	});
};


module.exports = userRepository;