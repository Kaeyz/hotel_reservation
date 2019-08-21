const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function createReservationValidator(data) {
	const errors = {};

	data.room_name = !isEmpty(data.room_name) ? data.room_name : "";

	if (validator.isEmpty(data.room_name)) {
		errors.room_name = "name field is required";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};