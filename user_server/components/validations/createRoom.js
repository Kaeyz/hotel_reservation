const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function createUserValidator(data) {
	const errors = {};

	data.name = !isEmpty(data.name) ? data.name : "";
	data.require_points = !isEmpty(data.required_points) ? data.required_points : "";
	data.available_amount = !isEmpty(data.available_amount) ? data.available_amount : "";


	if (validator.isEmpty(data.name)) {
		errors.name = "name field is required";
  }


  if (!validator.isInt(data.available_amount)) {
    errors.available_amount = "available amount field needs to be a number"
  }

  if (validator.isEmpty(data.available_amount)) {
    errors.available_amount = "available amount field is required";
  }

  if (!validator.isInt(data.required_points)) {
    errors.required_points = "required amount field needs to be a number"
  }

  if (validator.isEmpty(data.required_points)) {
    errors.required_points = "required point field is required";
  }

	return {
		errors,
		isValid: isEmpty(errors)
	};
};