const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const prefixer = require('autoprefixer');
const webpack = require('webpack');

module.exports = merge.smart(common, {
	devtool: 'source-map',
	plugins: [
			new webpack.DefinePlugin({
								'process.env.NODE_ENV': JSON.stringify('production')
								})
			],
	module: {
		rules: [
				{
					test:/\.css$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								plugins: () => [
												prefixer({
														browsers: [
																	"> 1%",
																	"last 2 versions"
																]
													})
											]
									}
						}
						]
				}
				]
			}
});