const express = require("express");
const router = express.Router();
const User = require("../models/user");
const joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const SpecialCards = require("../models/specialCards");

const registerSchema = joi.object({
	name: joi.string().required().min(2),
	email: joi.string().required().email().min(4),
	password: joi.string().required().min(4),
	isBusiness: joi.boolean(),
});

router.post("/", async (req, res) => {
	try {
		//vaidate with joi
		const { error } = registerSchema.validate(req.body);
		if (error)
			return res.status(400).send("Sorry my dude, cant use dem inputs");

		//check whether user alreaady exists
		let user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(400)
				.send(
					"Unfortunately this user already exists. Maybe not unfortunately tho."
				);

		user = new User(req.body);
		//encrypt password
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(req.body.password, salt);
		await user.save();

		//create special cards cache
		if (req.body.isBusiness == true) {
			let specialCards = new SpecialCards({
				userId: user._id,
				cards: [],
				active: true,
			});
			await specialCards.save();
		}

		//create token
		const token = JWT.sign(
			{
				_id: user._id,
				email: user.email,
				isBusiness: user.isBusiness,
			},
			process.env.JWTKEY
		);
		res.status(201).send(token);
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
