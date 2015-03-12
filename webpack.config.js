var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = {
	cache: false,
	context: path.join(__dirname, 'src'),
	entry: {
		app: './js/app.js',
		verdor: [
			'script!' + path.join(__dirname, 'vendor/angular-easyfb.min.js'),
			'script!' + path.join(__dirname, 'vendor/loading-bar.min.js')
		]
	},
	output: {
		path: path.join(__dirname, '.build'),
		publicPath: '/',
		filename: 'mitopedia.js?[hash]'
	},
	module: {
		loaders: [
			{ test: /\.js$/i, exclude: /node_modules/i, loader: 'babel?experimental&optional=runtime' },
			{ test: /\.json$/i, loader: 'json' },
			{ test: /\.css$/i, loader: 'style!css' },
			{ test: /\.less$/i, loader: 'style!css!less' },
			{ test: /\.html?$/i, loader: 'file?name=[path][name].[ext]?[hash]' },
			{ test: /\.(jpe?g|png|gif)$/i, loader: 'file?name=[path][name].[ext]?[hash]' },
			{ test: /\.(ttf|woff|eot)$/i, loader: 'file?name=[path][name].[ext]?[hash]' }
		]
	},
	resolve: {
		root: [
			path.join(__dirname, 'src')
		],
		extensions: ['', '.js']
	},
	plugins: [
		new HtmlWebpackPlugin({ title: 'Mitopedia',	template: 'src/index.html' }),
		new StatsPlugin(path.join(__dirname, 'stats.json'))
	]
};
