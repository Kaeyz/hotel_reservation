const User = require("./User");


/**
 * @description Handles all database tasks and queries related to the account model.
 */
const userRepository = {};

/**
 * @description Finds a specific account fromm the database using the account ID
 * @requires Account_Id
 * @returns Returns account matching the account Id
 */
userRepository.findAccountById = (userId) => {
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


module.exports = userRepository;