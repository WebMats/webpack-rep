const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve( __dirname, 'dist'),
		filename: 'bundle.js',
		chunkFilename: '[id].js',
		publicPath: ''
	},
	resolve: {
		extensions:['.js', '.jsx']
	},
	module: {
		rules: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/
				},
				{
					test: /\.css$/,
					exclude: /node_modules/,
					use: [
							{loader: 'style-loader'},
							{
								loader: 'css-loader',
								options: {
									importLoaders: 1,
									modules: true,
									localIdentName: '[name]__[local]__[hash:base64:5]'
								}
							},
						]
				},
				{
					test: /\.(png|jpe?g|gif)$/,
					loader: 'url-loader?limit=8000&name=images/[name].[ext]'
				}
			]
		},
	plugins: [
				new CleanWebpackPlugin(['dist']),
				new HtmlWebpackPlugin({
									template:__dirname + '/src/index.html',
									filename: 'index.html',
									inject: 'body'
									})
				]
};