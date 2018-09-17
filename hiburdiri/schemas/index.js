const gql = require("graphql");
const request = require("request-promise");
const MovieResponseType = require("./MoviesResponse");
const SeriesResponseType = require("./SeriesResponse");
const SeriesType = require("./Series");
const MoviesType = require("./Movies");
const { setValue, getValue } = require("../controllers/redisController");

const schema = new gql.GraphQLSchema({
	query: new gql.GraphQLObjectType({
		name: "root",
		fields: {
			allMovies: {
				type: MovieResponseType,
				resolve: async () => {
					let cache = await getValue("movies");
					if (cache) {
						return JSON.parse(cache);
					} else {
						let response = await request.get(process.env.BASE_URL_MOVIE, {
							json: true
						});

						return response;
					}
				}
			},
			allSeries: {
				type: SeriesResponseType,
				resolve: async () => {
					let cache = await getValue("tvs");
					if (cache) {
						return JSON.parse(cache);
					} else {
						let response = await request.get(process.env.BASE_URL_TV, {
							json: true
						});

						return response;
					}
				}
			},
			seriesById: {
				type: SeriesType,
				args: {
					id: {
						type: gql.GraphQLID
					}
				},
				resolve: async (_parent, args, _context) => {
					let response = await request.get(
						process.env.BASE_URL_TV + "/" + args.id,
						{
							json: true
						}
					);
					return response.data;
				}
			},
			moviesById: {
				type: SeriesType,
				args: {
					id: {
						type: gql.GraphQLID
					}
				},
				resolve: async (_parent, args, _context) => {
					let response = await request.get(
						process.env.BASE_URL_MOVIE + "/" + args.id,
						{
							json: true
						}
					);
					return response.data;
				}
			}
		}
	}),
	mutation: new gql.GraphQLObjectType({
		name: "rootMutation",
		fields: {
			createNewMovie: {
				type: MoviesType,
				args: {
					title: { type: gql.GraphQLString },
					overview: { type: gql.GraphQLString },
					popularity: { type: gql.GraphQLInt },
					poster_path: { type: gql.GraphQLString }
				},
				resolve: async (_parent, args, _context) => {
					let options = {
						method: "POST",
						uri: process.env.BASE_URL_MOVIE,
						body: args,
						json: true
					};
					let response = await request(options);
					let getAllAfterUpdate = await request.get(process.env.BASE_URL_MOVIE);
					let updateRedis = await setValue("movies", getAllAfterUpdate);
					return response.data;
				}
			},
			createNewSeries: {
				type: SeriesType,
				args: {
					title: { type: gql.GraphQLString },
					overview: { type: gql.GraphQLString },
					popularity: { type: gql.GraphQLInt },
					poster_path: { type: gql.GraphQLString }
				},
				resolve: async (_parent, args, _context) => {
					let options = {
						method: "POST",
						uri: process.env.BASE_URL_TV,
						body: args,
						json: true
					};
					let response = await request(options);
					let getAllAfterUpdate = await request.get(process.env.BASE_URL_TV);
					let updateRedis = await setValue("tvs", getAllAfterUpdate);
					return response.data;
				}
			},
			deleteByIdSeries: {
				type: SeriesType,
				args: {
					id: { type: gql.GraphQLID }
				},
				resolve: async (_parent, args, _context) => {
					let options = {
						method: "DELETE",
						uri: process.env.BASE_URL_TV + "/" + args.id,
						json: true
					};
					let response = await request(options);
					console.log(response);
					let getAllAfterUpdate = await request.get(process.env.BASE_URL_TV);
					let updateRedis = await setValue("tvs", getAllAfterUpdate);
					return response.data;
				}
			},
			deleteByIdMovies: {
				type: MoviesType,
				args: {
					id: { type: gql.GraphQLID }
				},
				resolve: async (_parent, args, _context) => {
					let options = {
						method: "DELETE",
						uri: process.env.BASE_URL_MOVIE + "/" + args.id,
						json: true
					};
					let response = await request(options);
					let getAllAfterUpdate = await request.get(process.env.BASE_URL_MOVIE);
					let updateRedis = await setValue("movies", getAllAfterUpdate);
					return response.data;
				}
			},
			patchByIdSeries: {
				type: SeriesType,
				args: {
					id: { type: gql.GraphQLID },
					title: { type: gql.GraphQLString },
					overview: { type: gql.GraphQLString },
					popularity: { type: gql.GraphQLInt },
					poster_path: { type: gql.GraphQLString }
				},
				resolve: async (_parent, args, _context) => {
					let options = {
						method: "PATCH",
						uri: process.env.BASE_URL_TV + "/" + args.id,
						json: true,
						body: {
							title: args.title,
							overview: args.overview,
							popularity: args.popularity,
							poster_path: args.poster_path
						}
					};
					let response = await request(options);
					let getAllAfterUpdate = await request.get(process.env.BASE_URL_TV);
					let updateRedis = await setValue("tvs", getAllAfterUpdate);
					return response.data;
				}
			},
			patchByIdMovies: {
				type: MoviesType,
				args: {
					id: { type: gql.GraphQLID },
					title: { type: gql.GraphQLString },
					overview: { type: gql.GraphQLString },
					popularity: { type: gql.GraphQLInt },
					poster_path: { type: gql.GraphQLString }
				},
				resolve: async (_parent, args, _context) => {
					let options = {
						method: "PATCH",
						uri: process.env.BASE_URL_MOVIE + "/" + args.id,
						json: true,
						body: {
							title: args.title,
							overview: args.overview,
							popularity: args.popularity,
							poster_path: args.poster_path
						}
					};
					let response = await request(options);
					let getAllAfterUpdate = await request.get(process.env.BASE_URL_MOVIE);
					let updateRedis = await setValue("movies", getAllAfterUpdate);
					return response.data;
				}
			}
		}
	})
});

module.exports = schema;
