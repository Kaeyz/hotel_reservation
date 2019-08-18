const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function createUserValidator(data) {
	const errors = {};

	data.name = !isEmpty(data.name) ? data.name : "";

	if (validator.isEmpty(data.name)) {
		errors.name = "name field is required";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};