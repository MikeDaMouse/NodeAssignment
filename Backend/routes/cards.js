const express = require("express");
const router = express.Router();
const Card = require("../models/cards");
const SpecialCards = require("../models/specialCards");
const joi = require("joi");
const auth = require("../middleware/auth");
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");

const cardSchema = joi.object({
	name: joi.string().required().min(2),
	description: joi.string().required().min(2),
	location: joi.string().required().min(2),
	phone: joi.string().required().min(2),
	image: joi.string().required().min(2),
	cardId: joi.string(),
	__v: joi.number(),
});

router.post("/", auth, async (req, res) => {
	try {
		console.log(req.payload);
		//Make sure the guy is an admin
		if (!req.payload.isBusiness)
			return res.status(400).send("Sorry mate, you have no business here!");
		//joi validation
		const { error } = cardSchema.validate(req.body);
		if (error) return res.status(400).send("Invalid inputs my man!");
		//making a random card Id
		const cardId = uuidv4();
		const cardUserId = req.payload._id;
		//save new card
		let card = new Card({
			...req.body,
			cardId: cardId,
			cardUserId: cardUserId,
		});

		await card.save();
		//add to my cards
		let specialCards = await SpecialCards.findOne({
			userId: req.payload._id,
			active: true,
		});
		if (!specialCards) return res.status(401).send("no cards here my dude");
		//add to specal cards
		specialCards.cards.push({
			...req.body,
			cardId: cardId,
			cardUserId: cardUserId,
		});
		await specialCards.save();

		res.status(200).send("card added");
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get("/", auth, async (req, res) => {
	try {
		let cards = await Card.find();
		res.status(200).send(cards);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get("/:cardId", auth, async (req, res) => {
	try {
		let card = await Card.findOne({ cardId: req.params.cardId });
		if (!card) return res.status(400).send("No such card");
		res.status(200).send(card);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.put("/:cardId", auth, async (req, res) => {
	try {
		if (!req.payload.isBusiness)
			return res
				.status(400)
				.send("Access denied, you got no business being here and doing that!");

		//validation
		const { error } = cardSchema.validate(req.body);
		if (error) res.status(400).send("Cant be having those inputs fella!!");

		let card = await Card.findOneAndUpdate(
			{ cardId: req.params.cardId },
			{ ...req.body },
			{ new: true }
		);
		if (!card) return res.status(404).send("Card not found");

		// Find the SpecialCards document for the user
		let specialCards = await SpecialCards.findOne({
			userId: req.payload._id,
			active: true,
		});

		if (!specialCards) return res.status(404).send("No special Cards");

		// Find the index of the card in the cards array
		const cardIndex = specialCards.cards.findIndex(
			(c) => c.cardId === req.params.cardId
		);

		if (cardIndex !== -1) {
			// Update the card data in the cards array
			specialCards.cards[cardIndex] = {
				...req.body,
				cardId: req.params.cardId,
			};

			// Save the changes to the SpecialCards document
			await specialCards.save();
		}

		res.status(200).send(card);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete("/:cardId", auth, async (req, res) => {
	try {
		if (!req.payload.isBusiness)
			return res.status(400).send("Access denied my dude");

		let card = await Card.findOneAndRemove({ cardId: req.params.cardId });
		if (!card) return res.statys(404).send("Nothing there!");
		res.status(200).send("card deleted");
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
