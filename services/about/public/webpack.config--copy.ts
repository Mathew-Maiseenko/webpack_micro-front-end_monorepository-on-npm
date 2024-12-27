import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'

type Mode = 'development' | 'production'

interface EnvironmentVariables {
	port?: number
	mode: Mode
}

export default (env: EnvironmentVariables) => {
	console.log(env)

	const isDev = env.mode === 'development' // флажек режима разработки
	const config: webpack.Configuration = {
		mode: env.mode ?? 'development', // режим разработки
		entry: path.resolve(__dirname, 'src', 'index.tsx'), // путь до точки входа в приложение
		output: {
			clean: true, //очищать ли папку после ребилада
			path: path.resolve(__dirname, 'build'), // папка хранения бандла
			filename: 'bundle.[contenthash].js', // имя бандл файла
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/, //подключение обработки ts/tsx файлов (ts-loader)-ом
					use: 'ts-loader',
					exclude: /node_modules/, //исключение из обработки
				},
				{
					test: /\.s[ac]ss$/i, // css and scss
					use: [
						//с конца в начало массива
						// Creates `style` nodes from JS strings
						MiniCssExtractPlugin.loader,
						// Translates CSS into CommonJS
						'css-loader',
						// Compiles Sass to CSS
						'sass-loader',
					],
				},
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'], //какие расширения обрабатывать
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, 'public', 'template.html'),
				// путь входного html, который будут преобразовыватьл в бандл
			}),
			isDev && new webpack.ProvidePlugin({}), //плагин показывабщий прогресс сборки проекта (медлителен при продакшене)
			isDev && new MiniCssExtractPlugin(),
		].filter(Boolean), // фильтрайция по истинности

		devtool: isDev ? 'inline-source-map' : undefined, // sourse-map для отловления ошибок в режиме разработки
		devServer: isDev
			? {
					compress: true,
					port: env.port ?? 3000, //подключение порта
			  }
			: undefined,
	}

	return config
}
