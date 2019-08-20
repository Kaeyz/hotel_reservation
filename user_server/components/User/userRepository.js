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
		newUser
			.save()
			.then(newUser => {
				return resolve(newUser);
		})
	});
};

/**
 * @description creates a new instance of an admin and saves it to the database
 * @requires admin_Details
 * @returns New admin created
 */
userRepository.createAdmin = (userOptions) => {
	return new Promise((resolve) => {
		const newUser = new User({
			username: userOptions.username,
			role: "ADMIN",
			points: 10000
		});
		newUser
			.save()
			.then(newUser => {
				return resolve(newUser);
		})
	});
};

/**
 * @description updates user point and saves it to the database
 * @requires user, required_points
 * @returns user with updated required_points
 */

userRepository.updateUserPoints = (user, points) => {
	return new Promise((resolve) => {
		user.points = points;
		user.save()
			.then(user => {
				return resolve(user);
			});
	});
};




/**
 * @description Finds a specific account from the database using account Username
 * @requires Account_Username
 * @returns Returns user matching the account username
 */
userRepository.findUserByUsername = (username) => {
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