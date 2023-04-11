const express = require("express");
const router = express.Router();
const SpecialCards = require("../models/specialCards");
const auth = require("../middleware/auth");
const joi = require("joi");

router.get("/", auth, async (req, res) => {
	try {
		let specialCards = await SpecialCards.findOne({
			userId: req.payload._id,
			active: true,
		});
		if (!specialCards) return res.status(401).send("no special cards here");
		res.status(200).send(specialCards.cards);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete("/:cardId", auth, async (req, res) => {
	try {
		let cardToDelete = await SpecialCards.findOneAndUpdate(
			{ userId: req.payload._id },
			{ $pull: { cards: { cardId: req.params.cardId } } },
			{ new: true }
		);
		if (!cardToDelete) return res.status(400).send("No Such Card!");
		res.status(200).send("Card deleted");
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
