import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'
import type { BuildWebpackOptions } from './types'
import path from 'path'
import ReactRefreshTypeScript from 'react-refresh-typescript'

export function buildLoaders(
	options: BuildWebpackOptions
): webpack.ModuleOptions['rules'] {
	const isDev = options.mode === 'development'

	// const typeScriptLoader = {
	// 	test: /\.tsx?$/, //подключение обработки ts/tsx файлов (ts-loader)-ом
	// 	exclude: /node_modules/, //исключение из обработки
	// 	use: [
	// 		{
	// 			loader: 'ts-loader',
	// 			options: {
	// 				transpileOnly: true, // отключение проверки типов при компиляции
	// 			},
	// 		},
	// 	],
	// }

	const typeScriptLoader = {
		test: /\.tsx?$/, //подключение обработки ts/tsx файлов (ts-loader)-ом
		exclude: /node_modules/, //исключение из обработки
		use: [
			{
				loader: 'ts-loader',
				options: {
					transpileOnly: false, // отключение проверки типов при компиляции
					getCustomTransformers: () => ({
						before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
					}),
				},
			},
		],
	}

	const babelLoader = {
		test: /\.tsx?$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: [
					'@babel/preset-env',
					'@babel/preset-typescript',
					'@babel/preset-react',
				],
			},
		},
	}

	const cssLoaderWithModules = {
		loader: 'css-loader',
		options: {
			modules: {
				localIdentName: '[path]_[name]__[local]--[hash:base64:5]',
				localIdentContext: path.resolve(__dirname),
				localIdentHashSalt: 'my-custom-hash',
			},
		},
	}

	const scssLoader = {
		test: /\.s[ac]ss$/i, // css and scss
		use: [
			//с конца в начало массива
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			// Translates CSS into CommonJS
			isDev ? cssLoaderWithModules : 'css-loader',
			// Compiles Sass to CSS
			{
				loader: 'sass-loader',
				options: {
					api: 'modern',
				},
			},
		],
	}

	const imagesLoader = {
		test: /\.(png|jpg|jpeg|gif)$/i,
		type: 'asset/resource',
	}

	const svgLoader = {
		test: /\.svg$/,
		use: [
			{
				loader: '@svgr/webpack',
				options: {
					icon: true,
					svgoConfig: {
						plugins: [
							{
								name: 'convertColors',
								params: {
									currentColor: true,
								},
							},
						],
					},
				},
			},
		],
	}

	return [typeScriptLoader, scssLoader, imagesLoader, svgLoader]
}
