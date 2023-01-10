'use strict';

const {
	GraphQLID,
	GraphQLString,
	GraphQLObjectType,
} = require('graphql');

const { GQLMessageType } = require("./gql-message-type.js");

const _database = require('../server/_database.js');

const GQLMutationType = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		sendMessage: {
			type: GQLMessageType,
			args: {
				id: {
					type: GraphQLID,
				},
				content: {
					type: GraphQLString,
				},
				roomId: {
					type: GraphQLID,
				},
				userId: {
					type: GraphQLID,
				}
			},
			resolve(parent, args) {
				if (args.id) {
					for (let msg of _database.messages) {
						if (msg.id == args.id) {
							return Object.assign(msg, args);
						};
					};

					// id передан но сообщение не найдено
					throw new Error(`message with id ${args.id} is not found`);
				};

				args.datetime = Date.now() + '';

				_database.messages.push(args);

				return _database.messages.last();
			},
		},
	},
});

module.exports = {
	GQLMutationType,
};