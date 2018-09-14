const router = require("express").Router();
const movieRoute = require("./movies");

router.use("/movies", movieRoute);

router.get("/", function(req, res) {
	res.send("Well This works");
});

module.exports = router;
