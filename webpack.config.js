const
	path = require('path'),
	TerserPlugin = require("terser-webpack-plugin"),
	webpack = require('webpack'),
	HtmlWebpackPlugin = require('html-webpack-plugin')
;


const plugins = (argv) => [
	new webpack.ProvidePlugin({
		'React':     'react'
	}),
	new HtmlWebpackPlugin({ template: './public/index.html' })
];


module.exports = (env, argv) => {
	return {
		entry: path.resolve(__dirname, './src/index.js'),
		output: {
			path: path.resolve(__dirname, './dist'),
			//filename: '[name].[contenthash].js',
			clean: true,
		},
		devtool: (env.WEBPACK_BUILD && env.WEBPACK_BUNDLE) ? false : 'source-map',
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: ["babel-loader"]
				}
			]
		},
		optimization: {
			minimizer: [
				new TerserPlugin({
					parallel: true,
				})
			]		  
		},
		plugins: plugins(argv),
		externals: {
			
		},
		resolve: {
			roots: [
				path.resolve(__dirname, "src"),
				path.resolve(__dirname, "node_modules")
			],
			extensions: ['*', '.js', '.jsx'],		
		},
		devServer: {
			port: 3000,
			allowedHosts: 'all',
			static: {
				directory: path.join(__dirname, 'public/'),
			},
			proxy: {
				'/api': 'http://localhost:5000',
			},
		},
	}
};