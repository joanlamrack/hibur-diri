const { getValue } = require("../controllers/redisController");

module.exports = {
	getAllCache: async function(req, res, next) {
		let allCache = await getValue("all");
		if (allCache) {
			allCache = JSON.parse(allCache)
			res.status(200).json(allCache);
		} else {
			next();
		}
	},
	getByIdCache: async function(req, res, next) {
		let byIdCache = await getValue(`${req.params.sectionId}-${req.params.id}`);
		if (byIdCache) {
			res.status(200).json(JSON.parse(byIdCache));
		} else {
			next();
		}
	},
	getBySectionCache: async function(req, res, next) {
		let bySectionCache = await getValue(`${req.params.sectionId}`);
		if (bySectionCache) {
			res.status(200).json(JSON.parse(bySectionCache));
		} else {
			next();
		}
	}
};
