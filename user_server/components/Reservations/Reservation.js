const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ReservationSchema = new Schema({
  room: {
    type: Schema.Types.ObjectId,
		ref: "rooms"
  },
  user: {
    type: Schema.Types.ObjectId,
		ref: "users"
  },
  status: {
    type: String,
		required: "status not specified",
		enum: ["RESERVED", "PENDING_APPROVAL"],
		default: "PENDING_APPROVAL"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});


function autoPopulate(next) {
	this.populate("room", [
		"name", "required_points", "available_amount"
	]);
  this.populate("user", [
		"username", "points", "role"
	]);
	next();
}

UserProfileSchema.pre("find", autoPopulate);
UserProfileSchema.pre("findOne", autoPopulate);

module.exports = mongoose.model("reservations", ReservationSchema);