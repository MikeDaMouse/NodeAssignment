const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const login = require("./routes/login");
const profile = require("./routes/profile");
const register = require("./routes/register");
const cards = require("./routes/cards");
const SpecialCards = require("./routes/specialCards");

port = process.env.PORT || 3000;
const logger = (req, res, next) => {
	console.log(`${req.method}, ${req.url}`);
	next();
};

app.use(express.json());
app.use(cors());
app.use(logger);
app.use("/api/login", login);
app.use("/api/register", register);
app.use("/api/profile", profile);
app.use("/api/cards", cards);
app.use("/api/specialcards", SpecialCards);

mongoose
	.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Success! Connected"))
	.catch((error) => console.log(error));

app.listen(port, () => console.log(`Server is SERVED on port ${port}`));
