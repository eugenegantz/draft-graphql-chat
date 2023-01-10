'use strict';

import styles from './b-app.m.css';

import React from 'react';
import { BChat } from '../b-chat/b-chat';
import { DChat } from '../d-chat/d-chat';
import { gql, useQuery } from '@apollo/client';

export class BApp extends React.Component {

    private _error = null;


    constructor(props) {
        super(props)
    }


    componentDidCatch(error, info) {
		console.error(error, info);

		if (error instanceof Error) {
			if (/tag\.js|metrika/ig.test(error.stack)) {
				// падает метрика и валит за собой интерфейс
				// игнорировать ошибку
			} else {
				this._error = error.stack + '';
			}

		} else {
			this._error = error + '';
		}

		// Если после обработки машина решила, что ошибки нет - пропустить
		if (!this._error)
			return;

		this._error += '\n' + info.componentStack;

		this.forceUpdate();
	}


	_renderErrorPage() {
		return (
			<div className={styles['error-page']}>
				<div className={styles['erorr-head']}>
					<div className={styles['error-icon']}>:'(</div>
					<div className={styles['error-title']}>К сожалению, на странице возникла ошибка</div>
					<div className={styles['error-description']}>
						Свяжитесь с нашими специалистами.
						<br />Скопируйте текст ошибки ниже или сделайте снимок экрана, и отправьте его нам.
						<br />Постарайтесь подробно описать порядок ваших действий приведший к данной ошибке.
					</div>
				</div>
				<div className={styles['error-body']}>
					<div className={styles['error-trace']}>
						<pre>{this._error}</pre>
					</div>
				</div>
			</div>
		);
	}


    render() {
		if (this._error) {
			return this._renderErrorPage();
		}

        return (
            <DChat>
                <BChat />
            </DChat>
        );
    }

}