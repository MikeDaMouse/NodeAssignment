const { string } = require("joi");
const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
	cardId: {
		type: String,
		required: true,
		unique: true,
	},
	cardUserId: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
		minLength: 2,
	},
	description: {
		type: String,
		required: true,
		minLength: 2,
	},
	location: {
		type: String,
		required: true,
		minLength: 2,
	},
	phone: {
		type: String,
		required: true,
		minLength: 2,
	},
	image: {
		type: String,
		required: true,
		minLength: 2,
	},
});

const Card = mongoose.model("cards", cardSchema);
module.exports = Card;
