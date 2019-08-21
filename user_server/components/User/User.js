const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		required: "Username is required"
	},
	points: {
		type: Number,
		required: true,
		default: 250
	},
	role: {
		type: String,
		required: "Account type not specified",
		enum: ["USER", "ADMIN"],
		default: "USER"
	}
});

UserSchema.virtual("reservations", {
	ref: "reservations",
	localField: "_id",
	foreignField: "user"
});


module.exports = mongoose.model("users", UserSchema);