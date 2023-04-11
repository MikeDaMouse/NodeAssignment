const mongoose = require("mongoose");

const specialCardsSchema = mongoose.Schema({
	userId: {
		type: String,
		required: true,
		unique: true,
	},
	cards: {
		type: Array,
		required: true,
	},
	active: {
		type: Boolean,
		required: true,
	},
});

const SpecialCards = mongoose.model("specialCards", specialCardsSchema);

module.exports = SpecialCards;
