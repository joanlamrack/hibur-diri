const Tv = require("../models/movie");
const ObjectIdHelper = require("../helpers/objectIdhelper");

class MovieController {
	constructor() {}

	static create(req, res) {
		Tv.create({
			title: req.body.title,
			overview: req.body.overview,
			poster_path: req.body.poster_path,
			popularity: req.body.popularity
		})
			.then(response => {
				res.status(201).json(response);
			})
			.catch(err => {
				res.status(400).json({
					error: err.message
				});
			});
	}

	static getAll(req, res) {
		Tv.find({})
			.populate("tag")
			.then(data => {
				res.status(200).json(data);
			})
			.catch(err => {
				res.status(500).json(err);
			});
	}

	static getById(req, res) {
		Tv.findById(ObjectIdHelper.convertObjectIdToStr(req.params.TvId))
			.then(data => {
				res.status(200).json(data);
			})
			.catch(err => {
				res.status(500).json(err);
			});
	}

	static update(req, res) {
		Tv.findByIdAndUpdate(
			ObjectIdHelper.convertStringIntoObjId(req.params.TvId),
			{
				title: req.body.title,
				overview: req.body.overview,
				poster_path: req.body.poster_path,
				popularity: req.body.popularity
			}
		)
			.then(data => {
				res.status(200).json(data);
			})
			.catch(err => {
				res.status(500).json(err);
			});
	}

	static delete(req, res) {
		Tv.findByIdAndRemove(ObjectIdHelper.convertObjectIdToStr(req.params.TvId))
			.then(data => {
				res.status(200).json(data);
			})
			.catch(err => {
				res.status(500).json(err);
			});
	}
}

module.exports = MovieController;
