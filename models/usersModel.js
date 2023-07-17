const mongoose = require("mongoose");

const UserModelSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: false,
	},
});

module.exports = mongoose.model("User", UserModelSchema, "users");
