const gql = require("graphql");

const TagsType = new gql.GraphQLObjectType({
	name: "TagType",
	fields: {
		_id: { type: gql.GraphQLID },
		_v: { type: gql.GraphQLInt },
		name: { type: gql.GraphQLString }
	}
});

module.exports = TagsType;
