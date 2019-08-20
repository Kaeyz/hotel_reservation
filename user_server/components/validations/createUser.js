const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function createUserValidator(data) {
	const errors = {};

	data.username = !isEmpty(data.username) ? data.username : "";

	if (validator.isEmpty(data.username)) {
		errors.username = "username field is required";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};