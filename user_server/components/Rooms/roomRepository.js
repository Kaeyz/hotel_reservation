const Room = require("./Room");


/**
 * @description Handles all database tasks and queries related to the room model.
 */
const roomRepository = {};

/**
 * @description Finds a specific room fromm the database using the userID
 * @requires room_Id
 * @returns Returns user matching the room_Id
 */
roomRepository.findRoomById = (roomId) => {
	return new Promise((resolve, reject) => {
		User
			.findById(roomId)
			.then(room => {
				return resolve(user);
			})
			.catch(err => {
				return reject(err);
			});
	});
};


/**
 * @description creates a new instance of an room and saves it to the database
 * @requires room_Details
 * @returns New room created
 */
roomRepository.createRoom = (roomOptions) => {
	return new Promise((resolve) => {
		const newRoom = new Room({
			name: roomOptions.name,
      required_points: roomOptions.require_points,
      available_amount: roomOptions.available_amount
		});
		newRoom
			.save()
			.then(newRoom => {
				return resolve(newRoom);
		})
	});
};


/**
 * @description Finds a specific room from the database using room name
 * @requires Room_name
 * @returns Returns room matching the room name
 */
roomRepository.findRoomByName = (name) => {
	return new Promise((resolve, reject) => {
		Room
			.findOne({
				name
			})
			.then(room => {
				return resolve(room);
			})
			.catch(err => {
				return reject(err);
			});
	});
};


module.exports = roomRepository;