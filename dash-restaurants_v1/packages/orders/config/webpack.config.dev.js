const webpack = require('webpack');
const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const CopyWebpackPlugin = require('copy-webpack-plugin');
const packageJson = require('../package.json');
const manifestJson = require('./webpack.manifest.json');

const publicPath = manifestJson.standalone
	? '/'
	: `${manifestJson.dev.host}:${manifestJson.dev.port}/`;

process.env.NODE_ENV = manifestJson.dev.mode;

let appEntry = {};
appEntry[`./${manifestJson.entry.appname}`] = manifestJson.entry.filename;

module.exports = {
	mode: manifestJson.dev.mode,
	target: 'web',
	devtool: 'cheap-module-source-map',
	entry: './src/index',
	output: {
		path: path.resolve(__dirname, '../build'),
		filename: 'bundle.js',
		publicPath: publicPath,
	},
	devServer: {
		port: manifestJson.dev.port,
		stats: 'minimal',
		overlay: true,
		historyApiFallback: true,
		disableHostCheck: true,
		headers: { 'Access-Control-Allow-Origin': '*' },
		https: false,
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.API_URL': JSON.stringify(publicPath),
		}),
		new ModuleFederationPlugin({
			name: manifestJson.name,
			filename: manifestJson.filename,
			exposes: appEntry,
			shared: packageJson.dependencies,
		}),
		new HtmlWebpackPlugin({
			template: 'public/index.html',
			favicon: 'public/favicon.ico',
		}),
		/*new CopyWebpackPlugin({
			patterns: [
				{
					from: 'public/data/',
					to: './data/',
				},
			],
		}),*/
	],
	module: {
		rules: [
			{
				test: /\.(jpeg|png|ico|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
						},
					},
				],
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader', // babel will process all our ES-16,17,18 and so on code to regular ES-5 version
					options: {
						presets: ['@babel/preset-react', '@babel/preset-env'], //
						plugins: ['@babel/plugin-transform-runtime'],
					},
				},
			},
			{
				test: /(\.css)$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
		],
	},
};
