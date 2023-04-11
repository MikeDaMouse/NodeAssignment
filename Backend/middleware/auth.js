const JWT = require("jsonwebtoken");

const authorize = (req, res, next) => {
	try {
		//get dat token!!
		let token = req.header("Authorization");
		if (!token) return res.status(401).send("No such token");
		//check token
		let payload = JWT.verify(token, process.env.JWTKEY);
		//save
		req.payload = payload;
		next();
	} catch (error) {
		res.status(400).send("Invalid token!!");
	}
};

module.exports = authorize;
