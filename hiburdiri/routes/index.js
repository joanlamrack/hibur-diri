const router = require("express").Router();
const entertainmeRoute = require("./entertainme");

router.use("/entertainme", entertainmeRoute);

router.get("/", function(req, res) {
	res.send("Well This works");
});

module.exports = router;
