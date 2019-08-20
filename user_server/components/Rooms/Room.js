const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RoomSchema = new Schema({
	name: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		required: "name is required"
  },
  available_amount: {
    type: Number,
		required: true,
		default: 1
  },
  required_points: {
		type: Number,
		required: true,
		default: 250
	}
});

module.exports = mongoose.model("rooms", RoomSchema);