const gql = require("graphql");
const request = require("request-promise");
const MovieResponseType = require("./MoviesResponse");
const SeriesResponseType = require("./SeriesResponse");

const schema = new gql.GraphQLSchema({
	query: new gql.GraphQLObjectType({
		name: "root",
		fields: {
			allMovies: {
				type: MovieResponseType,
				resolve: async () => {
					let response = await request.get(process.env.BASE_URL_MOVIE, {
						json: true
					});

					return response;
				}
			},
			allSeries: {
				type: SeriesResponseType,
				resolve: async () => {
					let response = await request.get(process.env.BASE_URL_TV, {
						json: true
					});

					return response;
				}
			},
			seriesById: {
				type: SeriesResponseType,
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
					console.log('response', response);
					return response;
				}
			}
		}
	})
});

module.exports = schema;
