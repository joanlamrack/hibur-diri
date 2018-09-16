require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const logger = require("morgan");

const indexroute = require("./routes/index");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", indexroute);

app.use(function(req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
	console.log(err);
	res.status(err.status || 500).json({
		message: err.message,
		error: {}
	});
});

app.listen(process.env.PORT || 3000, () => {
	console.log("Entertainme connected!");
});

module.exports = app;
