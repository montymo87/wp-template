const fs = require('fs');
const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require('babel-polyfill');

const root = path.resolve(__dirname, './'); // Корень проекта
const src = path.resolve(root, 'src'); // Исходники
const currentOutput = path.resolve(__dirname, 'dist'); // Папка для билда

module.exports = {
	entry: {
		app: path.resolve(src, 'index.js'),
	},
	resolve: {
		alias: {
			ScssHelpers: path.resolve(__dirname, 'src/scss/helpers/'),
			ScssComponents: path.resolve(__dirname, 'src/scss/components/'),
			ScssPlugins: path.resolve(__dirname, 'src/scss/plugins/'),
		},
		extensions: ['.ts', '.js', '*'],
		modules: [path.resolve(src, 'js'), 'node_modules'],
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader?cacheDirectory'],
			},
			{
				test: /\.(png|gif|webp|jpe?g|svg)$/i,
				type: 'asset',
				exclude: path.resolve(src, 'images', 'icons', 'sprite-icons'),
				parser: {
					dataUrlCondition: {
						maxSize: 8192,
					},
				},
				generator: {
					filename: 'images/[name][ext]',
				},
			},
			{
				test: /\.svg$/,
				include: path.resolve(src, 'images', 'icons', 'sprite-icons'),
				use: [
					{
						loader: 'svg-sprite-loader',
						options: {
							extract: true,
							publicPath: '/sprite/',
						},
					},
					{
						loader: 'svgo-loader',
					},
				],
			},
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 8192,
					},
				},
				generator: {
					filename: 'fonts/[name][ext]',
				},
			},
		],
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.$': 'jquery',
			'window.jQuery': 'jquery',
		}),
		new CleanWebpackPlugin({
			verbose: true,
			cleanStaleWebpackAssets: false,
			cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json'],
		}),
		new SpriteLoaderPlugin(),
		new MiniCssExtractPlugin({
			ignoreOrder: true,
			filename: 'css/[name].css',
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(src, 'images'),
					to: path.resolve(currentOutput, 'images'),
					toType: 'dir',
					noErrorOnMissing: true,
					globOptions: {
						dot: true,
						ignore: ['**/icons/other-icons/**', '**/icons/sprite-icons/**'],
					},
				},
			],
		}),

		new BrowserSyncPlugin(
			{
				proxy: 'http://sun-design',
				files: [`${root}/**/*.php`, `${src}/**/*.js`, `${src}/**/*.scss`],
				port: 3000,
				open: true,
				notify: false,
				ghostMode: false,
			},
			{ reload: true },
		),

		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1,
		}),

		new ESLintPlugin(),
	],
	target: 'web',
	output: {
		filename: 'js/[name].js',
		path: currentOutput,
	},
};
