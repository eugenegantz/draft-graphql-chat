'use strict';

const {
	GraphQLID,
	GraphQLString,
	GraphQLObjectType,
	GraphQLInt,
	GraphQLNonNull,
} = require('graphql');

const _ = require('lodash');

const _database = require('../server/_database.js');

const GQLMessageType = new GraphQLObjectType({
	name: 'Message',
	fields: () => ({
		id: {
			type: GraphQLID,
		},
		content: {
			type: GraphQLString,
		},
		datetime: {
			type: GraphQLString,
		},
		room: {
			type: new GraphQLNonNull(require('./gql-room-type.js').GQLRoomType),
			resolve(message) {
				return _.find(_database.rooms, room => message.roomId == room.id);
			},
		},
		user: {
			type: new GraphQLNonNull(require('./gql-user-type.js').GQLUserType),
			resolve(message) {
				return _.find(_database.users, user => message.userId == user.id);
			},
		},
	}),
});

module.exports = {
	GQLMessageType,
};