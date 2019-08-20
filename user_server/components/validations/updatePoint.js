const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function updateUserPointValidator(data) {
	const errors = {};

	data.username = !isEmpty(data.username) ? data.username : "";
	data.points = !isEmpty(data.points) ? data.points : "";


	if (validator.isEmpty(data.username)) {
		errors.username = "user field is required";
  }


  if (!validator.isInt(data.points)) {
    errors.points = "points field needs to be a number"
  }

  if (validator.isEmpty(data.points)) {
    errors.points = "points field is required";
  }

	return {
		errors,
		isValid: isEmpty(errors)
	};
};