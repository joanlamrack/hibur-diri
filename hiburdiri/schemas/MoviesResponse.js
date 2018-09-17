const gql = require("graphql");
const MoviesType = require("./Movies");

const MoviesResponseType = new gql.GraphQLObjectType({
	name: "MoviesResponseType",
	fields: {
		info: { type: gql.GraphQLString },
		data: { type: gql.GraphQLList(MoviesType) }
	}
});
module.exports = MoviesResponseType;
