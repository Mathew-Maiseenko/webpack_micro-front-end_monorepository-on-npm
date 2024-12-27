import webpack from 'webpack'
import { BuildWebpackOptions } from './types'

export function buildResolve(
	options: BuildWebpackOptions
): webpack.Configuration['resolve'] {
	return {
		extensions: ['.tsx', '.ts', '.js'], //какие расширения обрабатывать
		alias: {
			'@': options.paths.src,
		},
	}
}
