const Reservation = require("./Reservation");


/**
 * @description Handles all database tasks and queries related to the account model.
 */
const reservationRepository = {};

/**
 * @description Finds a specific user fromm the database using the userID
 * @requires user_Id
 * @returns Returns user matching the user_Id
 */
reservationRepository.findReservationById = (reservationId) => {
	return new Promise((resolve, reject) => {
		Reservation
			.findById(reservationId)
			.then(reservation => {
				return resolve(reservation);
			})
			.catch(err => {
				return reject(err);
			});
	});
};


/**
 * @description Creates new reservations
 * @requires user_Id
 * @returns Returns user matching the user_Id
 */
reservationRepository.createReservation = (user, room) => {
  return new Promise((resolve, reject) => {
    const newReservation = new Reservation({
      user: user._id,
      room: room._id
    });
    newReservation
      .save()
      .then(newReservation => {
        return resolve(newReservation);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

/**
 * @description update reservation status
 * @requires reservation
 * @returns Returns reservation
 */
reservationRepository.setReservationStatus = (reservation) => {
  return new Promise((resolve, reject) => {
    reservation.status = "RESERVED";
    reservation
      .save()
      .then(reservation => {
        return resolve(reservation);
      })
      .catch(err => reject(err));
  });
};



module.exports = reservationRepository