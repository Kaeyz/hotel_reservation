const userRepository = require("./userRepository");



// Input Validations
const createUserValidator = require("../validator/createUser");


const userController = {};

/**
 * @description sets up a new user account
 * @requires form_input
 * @returns new user created
 */
accountController.createUserAccount = (req, res) => {
  // 1. Validate form input
	const { errors, isValid } = createUserValidator(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
  };

  // check if user exist
  userRepository
    .findAccountByUsername(req.body.username)
    .then(user => {
      if (user) {
        errors.username = `Oops!! ${req.body.username} already taken. Try again`;
        return res.status(400).json(errors);
      } else {
        // create user
        userRepository
          .createUser(req.body)
          .then(newUser => {
            const success = `Congratulations ${newUser.username}!! Your account has been registered successfully. Login to your account`;
            return res.status(200).json({ msg: success });
          });
      }
    })
    .catch(err => {
      return res.status(503).json(err);
    });
}




module.exports = userController;