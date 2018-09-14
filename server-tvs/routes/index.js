const router = require("express").Router();
const tvRoute = require("./tv");

router.use("/tvs", tvRoute);

router.get("/", function(req, res) {
	res.send("Well This works");
});

module.exports = router;
