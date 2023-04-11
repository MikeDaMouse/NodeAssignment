const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 2,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		minLength: 4,
	},
	password: {
		type: String,
		required: true,
		minLength: 4,
	},
	isBusiness: {
		type: Boolean,
	},
});
const User = mongoose.model("users", userSchema);
module.exports = User;
