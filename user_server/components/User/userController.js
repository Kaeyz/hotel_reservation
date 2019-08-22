const userRepository = require("./userRepository");
const userController = {};
const keys = require("../../config/keys");


// Input Validations
const createUserValidator = require("../validations/createUser");
const updatePointValidator = require("../validations/updatePoint");
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
    .findUserByUsername(req.body.username)
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
 * @description sets up a new admin account
 * @requires form_input
 * @returns new admin created
 */
userController.createAdminAccount = (req, res) => {
  // 1. Validate form input
	const { errors, isValid } = createUserValidator(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
  };

  // check if user exist
  userRepository
    .findUserByUsername(req.body.username)
    .then(admin => {
      if (admin) {
        errors.username = `Oops!! ${req.body.username} already taken. Try again`;
        return res.status(400).json(errors);
      } else {
        // create user
        userRepository
          .createAdmin(req.body)
          .then(newAdmin => {
            const success = `Congratulations ${newAdmin.username}!! Your account has been registered successfully. Login to your account`;
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
    .findUserByUsername(req.body.username)
    .then(user => {
      if (!user) {
        errors.username = `Oops!! ${req.body.username} does not exist. Try again`;
        return res.status(404).json(errors);
      }
      // create JWT payload
      const payload = {
        id: user._id,
        username: user.username,
        points: user.points,
        role: user.role
      };
      tokenGenerator
        .loginToken(payload)
        .then(token => {
          const success = {msg: "Login success"};
          res.status(200).json(token, success, user);
        })
        .catch(err => res.status(503).json(err));
    })
    .catch(err => res.status(503).json(err));
};

/**
 * @description update user point
 * @requires username,admin,newPoints
 * @returns returns new user with updated points
 */
userController.updatePoint = (req, res) => {
    // 1. Validate form input
    const { errors, isValid } = updatePointValidator(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    };


  // find user with user name
  userRepository
    .findUserByUsername(req.body.username)
    .then(user => {
      // update user points from
      userRepository
        .updateUserPoints(user, req.body.points)
        .then(() => {
          const success = {msg: "points updated successfully"};
          res.status(200).json(success);
        })
        .catch(err => res.status(503).json(err));
    })
    .catch(err => res.status(503).json(err));
}

/**
 * @description app admin controller
 * @returns returns new user with role ADMIN
 */
userController.fetchAdmin = (req, res) => {
  userRepository
    .returnAdmin(keys.admin_username)
    .then(admin => {
      return res.send(admin);
    });
}



module.exports = userController;