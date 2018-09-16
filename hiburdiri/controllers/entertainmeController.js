const request = require("request-promise");
const serverUrlHelper = require("../helpers/serverUrlHelper");
const { setValue } = require("./redisController");

module.exports = {
	getAll: async function(req, res) {
		try {
			let movies = await request.get(process.env.BASE_URL_MOVIE, {
				json: true
			});
			let tvs = await request.get(process.env.BASE_URL_TV, { json: true });
			let value = await setValue("all", { movies: movies, series: tvs });
			console.log(movies, tvs);
			res.status(200).json({ movies: movies, series: tvs });
		} catch (err) {
			res.status(500).json(err);
		}
	},
	getAllbySection: async function(req, res) {
		try {
			console.log(serverUrlHelper.getUrlBySection(req.params.sectionId));
			let response = await request.get(
				serverUrlHelper.getUrlBySection(req.params.sectionId),
				{ json: true }
			);
			let value = await setValue(`${req.params.sectionId}`, response);
			res.status(200).json(response);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	create: async function(req, res) {
		var options = {
			method: "POST",
			uri: serverUrlHelper.getUrlBySection(req.params.sectionId),
			body: req.body,
			json: true // Automatically stringifies the body to JSON
		};
		try {
			let response = await request.post(options);

			let movies = await request.get(process.env.BASE_URL_MOVIE, {
				json: true
			});
			let tvs = await request.get(process.env.BASE_URL_TV, { json: true });
			let value = await setValue("all", { movies: movies, series: tvs });

			res.status(200).json(response);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	getById: async function(req, res) {
		try {
			let response = await request.get(
				serverUrlHelper.getUrlBySection + "/" + req.params.id,
				{ json: true }
			);
			res.status(200).json(response);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	deleteById: async function(req, res) {
		try {
			let response = await request.delete(
				serverUrlHelper.getUrlBySection + "/" + req.params.id,
				{ json: true }
			);

			let allresponse = await request.get(
				serverUrlHelper.getUrlBySection(req.params.sectionId),
				{ json: true }
			);
			let value = await setValue(
				`${req.params.sectionId}`,
				JSON.stringify(allresponse)
			);

			let movies = await request.get(process.env.BASE_URL_MOVIE, {
				json: true
			});
			let tvs = await request.get(process.env.BASE_URL_TV, { json: true });
			let morevalue = await setValue("all", { movies: movies, series: tvs });

			res.status(200).json(response);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	patchById: async function(req, res) {
		var options = {
			method: "PATCH",
			uri: serverUrlHelper.getUrlBySection(req.params.sectionId)+"/" + req.params.id,
			body: req.body,
			json: true // Automatically stringifies the body to JSON
		};
		try {
			let response = await request.patch(
				options
			);

			let allUpdate = await request.get(
				serverUrlHelper.getUrlBySection(req.params.sectionId),
				{ json: true }
			);
			let value = setValue(`${req.params.sectionId}`, allUpdate);

			let movies = await request.get(process.env.BASE_URL_MOVIE, {
				json: true
			});
			let tvs = await request.get(process.env.BASE_URL_TV, { json: true });
			let morevalue = await setValue("all", { movies: movies, series: tvs });

			res.status(200).json(response);
		} catch (err) {
			res.status(500).json(err);
		}
	}
};
