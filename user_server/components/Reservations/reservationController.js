const reservationRepository = require("./reservationRepository");
const roomRepository = require("../Rooms/roomRepository");
const userRepository = require("../User/userRepository");
const keys = require("../../config/keys");

const reservationController = {};


// Input Validations
const createReservationValidator = require("../validations/createReservation");



/**
 * @description sends notification email to admin after a new reservation has been made
 * @param {object} reservation
 * @param {object} room
 * @param {object} user
 */
const notifyAdminOfNewReservation = (reservation, room, user) => {
  // find admin
  userRepository
    .findUserByUsername(keys.admin_username)
    .then(admin => {
      // send notification
      const message = `${user.username} has just made a reservation for ${room.name}.`
      console.log(room, user, admin.username);
      return;
    });
}



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
  let user = req.user;
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
        .createReservation(user, room)
        .then(newReservation => {
          // update available room
          roomRepository
            .updateAvailableRoomsAfterReservation(room)
            .then(room => {
              // check if user has enough points to book reservation
              if (user.points >= room.required_points) {
                // if true book reservation and deduct user point
                userRepository
                  .updateUserPointsAfterReservation(user, room.required_points)
                  .then(user => {
                    reservationRepository
                      .setReservationStatus(newReservation)
                      .then(reservation => {
                        //  notify admin
                        notifyAdminOfNewReservation(reservation, user, room);
                        const success = { msg: `${room.name} has been reserved for you` };
                        return res.status(200).json(success);
                      });
                  });
              } else {
                //  notify admin
                notifyAdminOfNewReservation(newReservation, user, room);
                // remain pending
                const success = { msg: "Your reservation is pending an approval. You will be contacted by on of our agent to reserve the room" }
                return res.status(200).json(success);
              }
            }).catch(err => res.json(err));
        })
        .catch(err => res.status(503).status(err));
    })
    .catch(err => res.status(503).json({ err }));
};

module.exports = reservationController;