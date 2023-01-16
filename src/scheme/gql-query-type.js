'use strict';

const {
	GraphQLID,
	GraphQLList,
	GraphQLObjectType,
} = require('graphql');

const _database = require('../server/_database.js');

const GQLQueryType = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		messages: {
			type: new GraphQLList(require("./gql-message-type.js").GQLMessageType),
			args: {
				id: {
					type: new GraphQLList(GraphQLID),
				},
			},
			resolve(parent, args) {
				console.log(arguments);

				if (!args.id) {
					return _database.messages;
				}

				return _database.messages.filter(msg => !!~args.id.indexOf(msg.id + ''));
			},
		},
		rooms: {
			type: new GraphQLList(require("./gql-room-type.js").GQLRoomType),
			args: {
				id: {
					type: new GraphQLList(GraphQLID),
				},
			},
			resolve(parent, args) {
				if (!args.id) {
					return _database.rooms;
				}

				return _database.rooms.filter(room => !!~args.id.indexOf(room.id + ''));
			},
		},
	}),
});

module.exports = {
	GQLQueryType,
};
