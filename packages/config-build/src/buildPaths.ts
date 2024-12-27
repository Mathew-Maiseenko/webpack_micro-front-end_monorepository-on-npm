import type { BuildWebpackOptions } from './types'

export function buildPaths(options: BuildWebpackOptions) {
	return {
		mode: options.mode ?? 'development', // режим разработки
		entry: options.paths.entry, // путь до точки входа в приложение
		output: {
			clean: true, //очищать ли папку после ребилада
			path: options.paths.output, // папка хранения бандла
			filename: 'bundle.[contenthash].js', // имя бандл файла
		},
	}
}
