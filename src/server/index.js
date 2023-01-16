'use strict';

(async function() {
	const modfs = require('fs');
	const modpath = require('path');
	const express = require('express');
	const { createHandler } = require('graphql-http/lib/use/express');
	const cors = require('cors');

	global.__root = modpath.resolve(__dirname, '../../');
	
	const schema = require('../scheme/scheme.js').GQLSchemaType;
	const app = express();

	app.use(cors());

	app.all('/graphql', createHandler({
		schema,
		context: function() {
			console.log('context arguments', arguments);

			return { test_values: 100200 }
		}
	}));

	app.get('/random', (req, res) => {
		res.send(200, Math.random() + '');
	});

	app.use('/static', express.static(modpath.join(__root, './static')));

	{
		let htmlPath = modpath.join(__root, './src/client/index.html');
		let htmlStr = (await modfs.promises.readFile(htmlPath)).toString();

		app.get('/', (req, res) => {
			res.send(200, htmlStr);
		})
	}

	const serverPort = 3000;

	app.listen(serverPort, (err) => {
		console.log('Server listen on port ' + serverPort);
		
		if (err) {
			console.error('Server started with error', err);
		}

		console.log('\n\n', 'start page \n http://localhost:3000/');
	});
})();