const reservationRepository = require("./reservationRepository");
const roomRepository = require("../Rooms/roomRepository");
const userRepository = require("../User/userRepository");

const reservationController = {};


// Input Validations
const createReservationValidator = require("../validations/createReservation");



/**
 * @description creates new reservation
 * @requires form_input
 * @returns new user created
 */
reservationController.createNewReservation = (req, res) => {
  // 1. Validate form input
  const { errors, isValid } = createReservationValidator(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  };
  // find room
  roomRepository
    .findRoomByName(req.body.room_name)
    .then(room => {
      if (!room) {
        errors.room = "Oops!! Room not found";
        return res.status(404).json(errors);
      }

      if (room.available_amount < 1) {
        errors.room = "Sorry, Room is fully booked. Please check other rooms for you reservation";
        return res.status(400).json(errors);
      }

      // create reservation
      reservationRepository
        .createReservation(req.user, room)
        .then(newReservation => {

          // update room available
          roomRepository
            .updateAvailableRoomsAfterReservation(room, 1)
            .then(room => {

              // update reservation status
              if (req.user.points >= room.required_points) {
                console.log(req.user, room);
                // update user reservation point
                userRepository
                .updateUserPointsAfterReservation(req.user, room.required_points)
                .then(() => {
                  reservationRepository
                  .setReservationStatus(newReservation)
                  .then(() => {
                    const success = { msg: `${room.name} has been successfully reserved for you` };
                  return res.status(200).json(success);
                  })
                  .catch(err => res.status(503).json(err));
                })
                .catch(err => res.status(503).json(err));

                } else {
                  const success = {msg: `Your reservation has been successfully created but pending approval. Contact customer support for more info.`}
                  return res.status(200).json(success);
                }
              })
            .catch(err => res.status(503).json({ error_one: err }));
            })
            .catch(err => res.status(503).json({error_two: err}));
          })
          .catch(err => res.status(503).json({error_three: err}));
};

module.exports = reservationController;