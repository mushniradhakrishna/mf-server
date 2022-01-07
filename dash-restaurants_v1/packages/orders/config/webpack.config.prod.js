const webpack = require('webpack');
const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackBundleAnalyzer = require('webpack-bundle-analyzer');
//const CopyWebpackPlugin = require('copy-webpack-plugin');
const packageJson = require('../package.json');
const manifestJson = require('./webpack.manifest.json');

const subfolder = process.env.PRODUCTION_SUBDOMAIN || `/${manifestJson.subdomain}`;
//const subfolder = '';

const publicPath = manifestJson.standalone ? '/' : `${subfolder}${manifestJson.prod.folder}`;

process.env.NODE_ENV = manifestJson.prod.mode;

let appEntry = {};
appEntry[`./${manifestJson.entry.appname}`] = manifestJson.entry.filename;

module.exports = {
	mode: manifestJson.prod.mode,
	target: 'web',
	devtool: 'source-map',
	entry: './src/index',
	output: {
		path: path.resolve(__dirname, '../build'),
		filename: 'bundle.js',
		publicPath: publicPath,
	},
	plugins: [
		//Display bundle stats
		new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: 'static' }),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.API_URL': JSON.stringify(publicPath),
		}),
		new ModuleFederationPlugin({
			name: manifestJson.name,
			filename: manifestJson.filename,
			exposes: appEntry,
			shared: packageJson.dependencies,
		}),
		/*new HtmlWebpackPlugin({
			template: 'public/index.html',
			favicon: 'public/favicon.ico',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			},
		}),*/
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
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							postCssOptions: {
								plugins: [() => [require('cssnano')]],
							},
							sourceMap: true,
						},
					},
				],
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
