'use strict';

const {
	GraphQLID,
	GraphQLString,
	GraphQLList,
	GraphQLObjectType,
} = require('graphql');

const _ = require('lodash');

const _database = require('../server/_database.js');

const GQLUserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: {
			type: GraphQLID,
		},
		name: {
			type: GraphQLString,
		},
		rooms: {
			type: new GraphQLList(require('./gql-room-type.js').GQLRoomType),
			resolve(user) {
				// TODO: оптимизировать поиск

				let userRooms = [];

				for (let msg of _database.messages) {
					if (user.id == msg.userId) {
						userRooms.push(_.find(_database.rooms, room => msg.roomId == room.id));
					}
				}

				return userRooms;
			}
		},
		messages: {
			type: new GraphQLList(require('./gql-message-type.js').GQLMessageType),
			resolve(user) {
				return _database.messages.filter(msg => msg.userId == user.id);
			}
		},
	}),
});

module.exports = {
	GQLUserType,
};