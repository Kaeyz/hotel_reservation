const roomRepository = require("./roomRepository");
const roomController = {};


// Input Validations
const createRoomValidator = require("../validations/createRoom");



/**
 * @description sets up a new user account
 * @requires form_input
 * @returns new user created
 */
roomController.createRoom = (req, res) => {
  // 1. Validate form input
  const { errors, isValid } = createRoomValidator(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
  };

  // check if user exist
  roomRepository
    .findRoomByName(req.body.name)
    .then(room => {
      if (room) {
        errors.name = `Oops!! ${req.body.name} already taken. Try again`;
        return res.status(400).json(errors);
      } else {
        // create user
        roomRepository
          .createRoom(req.body)
          .then(newRoom => {
            const success = `${newRoom.name}!! has be created successfully.`;
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



module.exports = roomController;