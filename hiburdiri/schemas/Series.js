const gql = require("graphql");
const TagsType = require("./Tags");

const SeriesType = new gql.GraphQLObjectType({
	name: "SeriesType",
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
module.exports = SeriesType;
