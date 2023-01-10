'use strict';

const {
	GraphQLID,
	GraphQLString,
	GraphQLList,
	GraphQLObjectType,
} = require('graphql');

const _ = require('lodash');

const _database = require('../server/_database.js');

const GQLRoomType = new GraphQLObjectType({
	name: 'Room',
	fields: () => ({
		id: {
			type: GraphQLID,
		},
		name: {
			type: GraphQLString,
		},
		users: {
			type: new GraphQLList(require('./gql-user-type.js').GQLUserType),
			resolve(room) {
				// TODO: оптимизировать поиск
				let roomUsers = [];

				for (let msg of _database.messages) {
					if (msg.roomId == room.id) {
						roomUsers.push(
							_.find(_database.users, user => user.id == msg.userId)
						);
					}
				}

				return roomUsers;
			}
		},
		messages: {
			type: new GraphQLList(require('./gql-message-type.js').GQLMessageType),
			resolve(room) {
				_database.messages.filter(msg => msg.roomId == room.id);
			}
		},
	}),
});

module.exports = {
	GQLRoomType,
}