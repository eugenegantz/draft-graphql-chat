const
	nodeExternals               = require('webpack-node-externals'),
	webpack                     = require('webpack'),
	minimist                    = require('minimist'),
	argv                        = minimist(process.argv.slice(2)),
	OnBuildPlugin               = require('./plugins/webpack-plugin-on-build'),
	MiniCssExtractPlugin        = require('mini-css-extract-plugin');

const
	MODULES = {
		fs: require('fs'),
		path: require('path'),
	};

const
	DIR_BUILD = MODULES.path.resolve(__dirname, '../static/dist/');

const
	IS_DEV = process.env.NODE_ENV === 'development';

module.exports = {
	mode: IS_DEV ? 'development' : 'production',

	target: 'web',

	entry: MODULES.path.resolve(__dirname, '../src/client/index.ts'),

	output: {
		filename: 'app.bundle.js',
		path: DIR_BUILD,
	},

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".js", ".jsx"]
	},

	optimization: {
		minimizer: [
			
		],
	},

	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				// exclude: /node_modules/,
				use: [
					{
						loader: MODULES.path.resolve(__dirname, './loaders/import-meta.js'),
					},
					{
						loader: "ts-loader",
						options: {
							compilerOptions: {
								jsx: 'react',
							}
						}
					}
				]
			},

			{
				test: /\.m\.css$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// hmr: IS_DEV,
						},
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: {
								localIdentName: '[name]__[local]-[hash:base64:5]',
							},
						},
					},
				],
			},
		]
	},

	plugins: [
		/*
		new webpack.WatchIgnorePlugin([
			/\.js$/,
			/\.d\.ts$/
		]),
		*/
		new OnBuildPlugin(
			function(stats) {
				const newlyCreatedAssets = stats.compilation.assets;
				const protectedAssets = { '.gitignore': 1 };
				const unlinked = [];

				MODULES.fs.readdir(DIR_BUILD, (err, files) => {
					files.forEach(file => {
						if (!newlyCreatedAssets[file] && !protectedAssets[file]) {
							MODULES.fs.unlink(MODULES.path.resolve(DIR_BUILD, file), () => {});
							unlinked.push(file);
						}
					});

					if (unlinked.length > 0)
						console.log('Removed old assets: ', unlinked);
				})
			}
		),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// all options are optional
			// filename: '[name].[hash].css',
			// chunkFilename: '[id].css',
			filename: 'app.bundle.css',
			ignoreOrder: false, // Enable to remove warnings about conflicting order
		}),
	],

	// When importing a module whose path matches one of the following, just
	// assume a corresponding global variable exists and use that instead.
	// This is important because it allows us to avoid bundling all of our
	// dependencies, which allows browsers to cache those libraries between builds.
	externals: [
		// nodeExternals(),
	]
};