const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user");
const _ = require("lodash");

router.get("/", auth, async (req, res) => {
	try {
		let user = await User.findById(req.payload._id);
		if (!user) return res.status(404).send("Hey! no such user!");
		res.status(200).send(_.pick(user, ["_id", "name", "email", "isBusiness"]));
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
