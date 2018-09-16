const router = require("express").Router();
const {
	getAll,
	getAllbySection,
	create,
	getById,
	deleteById,
	patchById
} = require("../controllers/entertainmeController");

const {
	getAllCache,
	getByIdCache,
	getBySectionCache
} = require("../middlewares/redisMiddleware");

router.route("/").get(getAllCache, getAll);

router
	.route("/:sectionId/:id")
	.get(getByIdCache, getById)
	.delete(deleteById)
	.patch(patchById);

router
	.route("/:sectionId")
	.get(getBySectionCache, getAllbySection)
	.post(create);



module.exports = router;
