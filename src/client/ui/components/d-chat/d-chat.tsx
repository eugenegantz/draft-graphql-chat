'use strict';

import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

const voidfn = () => {};

const GQL_QUERY_GET_MESSAGES = gql`
	query getMessages {
		messages {
			id,
			content,
			datetime,
			room {
				id,
				name,
			},
			user {
				id,
				name,
			},
		}
	}
`;

const GQL_MUTATE_SEND_MESSAGES = gql`
	mutation _mutSendMessage(
		$content: String!,
		$roomId: ID!,
		$userId: ID!,
	) {
		sendMessage(
			content: $content,
			roomId: $roomId,
			userId: $userId,
		) {
			id,
			datetime,
		}
	}
`;

export function DChat(props) {
	let { data, error, loading } = useQuery(GQL_QUERY_GET_MESSAGES);

	const [mutSendMessage] = useMutation(GQL_MUTATE_SEND_MESSAGES, {
		awaitRefetchQueries: true,
		refetchQueries: [
			{
				query: GQL_QUERY_GET_MESSAGES
			},
		],
	});
	
	if (error) {
		return error + '';
	}

	if (loading) {
		return 'loading ...';
	}

	let messages = data.messages;
	let rooms = [];
	let users = [];

	if (messages.length) {
		// tmp sol
		rooms.push(messages[0].room);
		users.push(messages[0].user);
	}

	function sendMessage({ message, onCompleted = voidfn }) {
		mutSendMessage({
			variables: {
				content: message,
				roomId: 1, // tmp sol
				userId: 1, // tmp sol
			},
			awaitRefetchQueries: true,
			onCompleted,
		});
	}

	return React.Children.map(props.children, (child) => {
		return React.cloneElement(child, {
			messages,
			rooms,
			users,
			sendMessage,
		});
	});
}