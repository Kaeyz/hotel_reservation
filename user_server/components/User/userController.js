const userRepository = require("./userRepository");
const userController = {};


// Input Validations
const createUserValidator = require("../validations/createUser");
const tokenGenerator = require("../validations/token");


/**
 * @description sets up a new user account
 * @requires form_input
 * @returns new user created
 */
userController.createUserAccount = (req, res) => {
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
          })
          .catch(err => {
            return res.status(503).json(err);
          })
      }
    })
    .catch(err => {
      return res.status(503).json(err);
    });
}



/**
 * @description logs in a user
 * @requires form_input
 * @returns logged in user
 */
userController.loginUser = (req, res) => {
  // 1. Validate login input form
  const { errors, isValid } = createUserValidator(req.body);
  // 2. Handle validation errors
  if (!isValid) {
    return res.status(400).json(errors);
  }

  userRepository
    .findAccountByUsername(req.body.username)
    .then(user => {
      if (!user) {
        errors.username =
        errors.email = `Oops!! ${req.body.username} does not exist. Try again`;
        return res.status(404).json(errors);
      }
      // create JWT payload
      const payload = {
        id: user.id,
        username: user.username,
        points: user.points,
        role: user.role
      };
      tokenGenerator
        .loginToken(payload)
        .then(token => {
          const success = {};
          success.msg = "Login success";
          res.status(200).json(token, success, user);
        })
        .catch(err => res.status(503).json(err));
    })
    .catch(err => res.status(503).json(err));
};





module.exports = userController;