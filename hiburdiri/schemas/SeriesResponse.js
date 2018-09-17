const gql = require("graphql");
const SeriesType = require("./Series");

const SeriesResponseType = new gql.GraphQLObjectType({
	name: "SeriesResponseType",
	fields: {
		info: { type: gql.GraphQLString },
		data: { type: gql.GraphQLList(SeriesType) }
	}
});
module.exports = SeriesResponseType;
