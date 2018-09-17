const gql = require("graphql");
const TagsType = require("./Tags");

const MoviesType = new gql.GraphQLObjectType({
	name: "MoviesType",
	fields: {
		_id: { type: gql.GraphQLID },
		_v: { type: gql.GraphQLInt },
		createdAt: { type: gql.GraphQLString },
		updatedAt: { type: gql.GraphQLString },
		title: { type: gql.GraphQLString },
		overview: { type: gql.GraphQLString },
		poster_path: { type: gql.GraphQLString },
		popularity: { type: gql.GraphQLInt },
		tags: { type: gql.GraphQLList(TagsType) }
	}
});
module.exports = MoviesType;
