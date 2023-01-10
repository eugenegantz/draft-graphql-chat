'use strict';

import styles from './b-chat.m.css';
import React from 'react';
import { useCallback, useState, useRef } from 'react';
import moment from 'moment';

export function BChat(props) {
	let messagesRef = useRef(null);

	let {
		messages = [],
		rooms = [],
		users = [],
	} = props;

	let { sendMessage } = props;

	let [message, setMessage] = useState('');

	let onSubmitMessage = function(e) {
		console.log('submit', e);

		setMessage('');
		sendMessage({
			message: message,
			onCompleted() {
				// awaitRefetchQuery не работает как ожидалось
				setTimeout(() => {
					messagesRef.current.scrollTo({
						left: 0,
						top: messagesRef.current.scrollHeight,
						behavior: 'smooth',
					});
				}, 500);
			}
		 });
	};

	let onChangeInput = function(e) {
		console.log('change', e);

		setMessage(e.target.value);
	}

	let onKeyDown = function(e) {
		if (e.keyCode == 13 && e.ctrlKey) {
			onSubmitMessage(e);
		}
	};

	return (
		<div className={styles['chat']}>
			<div className={styles['left-panel']}>
				<div className={styles['left-top-panel']}>
					<div className={styles['users']}>
						{
							users.map((user) => {
								return <div key={user.id} className={styles['user']}>{user.name}</div>
							})
						}
					</div>
				</div>
				<div className={styles['left-bottom-panel']}>
					<div className={styles['rooms']}>
						{
							rooms.map((room) => {
								return <div key={room.id} className={styles['room']}>{room.name}</div>
							})
						}
					</div>
				</div>
			</div>
			<div className={styles['right-panel']}>
				<div className={styles['right-top-panel']}>
					<div className={styles['messages']} ref={messagesRef}>
						{
							messages.map((msg) => {
								let dateStr = moment(parseInt(msg.datetime)).format('yyyy-MM-DD hh:mm:ss');

								return (
									<div className={styles['message-row']} key={msg.id} >
										<div className={styles['message']} >
											<div className={styles['message-header']}>{dateStr} / {msg.user.name}</div>
											<div className={styles['message-content']}>{msg.content}</div>
										</div>
									</div>
								);
							})
						}
					</div>
				</div>
				<div className={styles['right-bottom-panel']}>
					<div>
						<textarea
							onChange={onChangeInput}
							onKeyDown={onKeyDown}
							placeholder="Напишите сообщение / Отправить CTRL+ENTER"
							className={styles['input']}
							value={message}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};