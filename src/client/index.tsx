'use strict';

import React, { StrictMode } from 'react';
import ReactDOM  from 'react-dom/client';
import { BApp } from './ui/components/b-app/b-app';

import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
} from '@apollo/client';

document.addEventListener('DOMContentLoaded', async function() {
	const client = new ApolloClient({
		// TODO: env.port; env.graphql_uri
		uri: 'http://localhost:3000/graphql',
		cache: new InMemoryCache(),
	});

	let appElement = document.querySelector('#app');
	let reactRoot = ReactDOM.createRoot(appElement)
	
	reactRoot.render(
		<ApolloProvider client={client}>
			<StrictMode>
				<BApp />
			</StrictMode>
		</ApolloProvider>
	);
});

export default null;