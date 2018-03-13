const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
	devtool: 'source-map',
	plugins: [
			new UglifyJSPlugin(),
			new webpack.DefinePlugin({
								'process.env.NODE_ENV': JSON.stringify('production')
									})
			],
	module: {
			rules: [
				{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
					]
				},
				{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file=loader'
					]
				}
				]
			}
});