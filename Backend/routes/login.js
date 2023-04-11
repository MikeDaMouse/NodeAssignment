const express = require("express");
const joi = require("joi");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const router = express.Router();

const loginSchema = joi.object({
	email: joi.string().required().min(4).email(),
	password: joi.string().required().min(8),
});

router.post("/", async (req, res) => {
	try {
		//Validating with joi
		const { error } = loginSchema.validate(req.body);
		if (error) return res.status(400).send(error);

		//check user existence
		let user = await User.findOne({ email: req.body.email });
		if (!user)
			return res
				.status(400)
				.send("Hmm, seems you have the wrong username or password");

		//check password
		const checkResult = await bcrypt.compare(req.body.password, user.password);
		if (!checkResult)
			return res
				.status(400)
				.send("Hmm, seems you have the wrong username or password");

		//create dat token!
		const token = JWT.sign(
			{ _id: user._id, isBusiness: user.isBusiness },
			process.env.JWTKEY
		);
		res.status(200).send(token);
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
