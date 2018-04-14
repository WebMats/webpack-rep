const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const getClientEnvironment = require('./env');
const paths = require('./paths');

// Webpack uses 'publicPath' to determine where the app is being served from.

const publicPath = '/';

// 'publicUrl' is just like 'publicPath', but we will provide it to our app 

const publicUrl = '';

// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);


module.exports = merge( common, {
	devtool: 'cheap-eval-source-map',
	entry: [
		//polyfills are loaded from different file
		require.resolve('./polyfills'),

		require.resolve('react-dev-utils/webpackHotDevClient'),

		paths.appIndexJs,
		],
		output: {
			// Add /* filename */ comments to generated require()s in the output.
			// Tell webpack to include comments in bundles with information about the contained modules
			pathinfo: true,

			filename: 'static/js/bundle.js',

			chunkFilename: 'static/js/[name].chunk.js',

			publicPath: publicPath,

			devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
			},
		resolve: {

			modules: ['node_modules', paths.appNodeModules].concat(
				process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
				),

			extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
			plugins: [

				new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
				]
			},
		module: {
			strictExportPresence: true,
			rules: [
				{
					test: /\.(js|jsx|mjs)$/,
					enforce: 'pre',
					use: [
						{
							options: {
								formatter: eslintFormatter,
								eslintPath: require.resolve('eslint'),
								},
								loader: require.resolve('eslint-loader'),
						},
						],
						include: paths.appSrc,
				},
				{
					oneOf: [
						{
							test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
							loader: require.resolve('url-loader'),
							options: {
								limit: 1000,
								name: 'static/media/[name].[hash:8].[ext]',
								},
						},
						{
            				test: /\.(js|jsx|mjs)$/,
            				include: paths.appSrc,
            				loader: require.resolve('babel-loader'),
            				options: {
            				  
            				  // This is a feature of `babel-loader` for webpack (not Babel itself).
            				  // It enables caching results in ./node_modules/.cache/babel-loader/
            				  // directory for faster rebuilds.
            				  cacheDirectory: true,
            						},
          				},
          				{
          					test: /\.css$/,
          					use: [
          						require.resolve('style-loader'),
          						{
          							loader: require.resolve('css-loader'),
          							options: {
          								importLoaders: 1,
          								modules: true,
          								localIdentName: '[name]__[local]__[hash:base64:5]'
          							},
          						},
          						{
          							loader: require.resolve('postcss-loader'),
          							options: {

          								ident: 'postcss',
          								plugins: () => [
          								require('postcss-flexbugs-fixes'),
          								prefixer({
          									browsers: [
          										'>1%',
          										'last 4 versions',
          										'Firefox ESR',
          										'not ie < 9',
          										],
          										flexbox: 'no-2009',
          									}),
          								],
          								},
          						},
          						],
          				},
						]
				}
				],
			}
})









