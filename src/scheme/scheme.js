'use strict';

const modfs = require('fs');
const modpath = require('path');

const { printSchema, GraphQLSchema } = require('graphql');

const { GQLQueryType } = require('./gql-query-type.js');
const { GQLMutationType } = require('./gql-mutation-type.js');

const GQLSchemaType = new GraphQLSchema({
	query: GQLQueryType,
	mutation: GQLMutationType,
});

modfs.writeFile(modpath.join(__root, './src/scheme/scheme.gql'), printSchema(GQLSchemaType), (err) => {
	// console.log('schema.gql', err);
});

module.exports = {
	GQLSchemaType,
};