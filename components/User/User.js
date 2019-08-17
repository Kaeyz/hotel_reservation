const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: "Please supply a username",
		trim: true
	},
	name: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		required: "Please supply an email address"
	},
	password: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	role: {
		type: String,
		enum: ["USER", "ADMIN"],
		required: "Account type not specified",
		default: "USER"
	}
});

module.exports = mongoose.model("users", UserSchema);