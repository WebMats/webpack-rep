'use strict';

const path = require('path');
const prefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {




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
							limit: 10000,
							name: 'static/media/[name].[hash:8].[ext]',
							},
					},
					{
						test: /\.(js|jsx|mjs)$/,
						include: paths.appSrc,
						loader: require.resolve('babel-loader'),
						options: {
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
											]
									}
							}
							]
					},
					{
						exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
						loader: require.resolve('file-loader'),
						options: {
								name: 'static/media/[name].[hash:8].[ext]'
								}
					}
					]
			}
			]
		}
	plugins: [
		new InterpolateHtmlPlugin(env.raw),
		new HtmlWebpackPlugin({
							inject: true,
							template: paths.appHtml,
							minify: {
								removeComments: true,
								collapseWhitespace: true,
								removeRedundantAttributes: true,
								removeEmptyAttributes: true,
								removeStyleLinkTypeAttributes: true,
								keepClosingSlash: true,
								minifyJS: true,
								minifyCSS: true,
								minifyURLs: true
								},
							})
		]


}
