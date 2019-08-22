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
 * @description makes sure application has an admin on startup
 * @returns admin
 */
userRepository.addAdminToDB = () => {
	return new Promise((resolve) => {
		userRepository
			.findUserByUsername("admin")
			.then(admin => {
				if (!admin) {
					const admin = { username: "admin" };
					userRepository.createAdmin(admin)
						.then(admin => resolve(admin))
				}
				return resolve(admin)
			});
	});
};

/**
 * @description updates user point and saves it to the database
 * @requires user,required_points
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
 * @description updates user point after reservation
 * @requires user,required_points
 * @returns user with updated required_points
 */

userRepository.updateUserPointsAfterReservation = (user, required_points) => {
	return new Promise((resolve) => {
		user.points -= required_points;
		user
			.save()
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

/**
 * @description returns application admin on request
 * @params admin username
 * @returns user with role admin
 */
userRepository.returnAdmin = (username) => {
	return new Promise((resolve) => {
		userRepository
			.findUserByUsername(username)
			.then(admin => resolve(admin));
	});
};


module.exports = userRepository;