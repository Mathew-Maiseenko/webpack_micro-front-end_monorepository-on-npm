import webpack from 'webpack'
import type { BuildWebpackOptions } from './types'
import { buildLoaders } from './buildLoaders'
import { buildPlugins } from './buildPlugins'
import { buildDevServer } from './buildDevServer'
import { buildResolve } from './buildResolve'
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'

export function buildWebpack(
	options: BuildWebpackOptions
): webpack.Configuration {
	const isDev = options.mode === 'development'
	const { paths, mode } = options

	const config: webpack.Configuration = {
		mode: mode ?? 'development', // режим разработки

		entry: paths.entry, // путь до точки входа в приложение

		output: {
			clean: true, //очищать ли папку после ребилада
			path: paths.output, // папка хранения бандла
			filename: 'bundle.[contenthash].js', // имя бандл файла
		},

		module: {
			rules: buildLoaders(options),
		},
		resolve: buildResolve(options),
		plugins: buildPlugins(options),

		devtool: isDev && 'inline-source-map',
		devServer: buildDevServer(options),
	}

	return config
}
