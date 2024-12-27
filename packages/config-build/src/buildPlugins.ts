import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import type { BuildWebpackOptions } from './types'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import path from 'path'

export const buildPlugins = (
	options: BuildWebpackOptions
): webpack.Configuration['plugins'] => {
	const isDev = options.mode === 'development'

	const plugins: webpack.Configuration['plugins'] = [
		new HtmlWebpackPlugin({
			template: options.paths.html,
			favicon: path.resolve(options.paths.public, 'favicon.ico'),
		}),
		new webpack.DefinePlugin({
			__ENV_DEVICE__: JSON.stringify(options.device),
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(options.paths.public, 'favicon.ico'),
					to: options.paths.output,
				},
			],
		}),
	]

	if (options.analyzer) {
		plugins.push(new BundleAnalyzerPlugin())
	}

	if (isDev) {
		plugins.push(new webpack.ProvidePlugin({}))
		plugins.push(new ForkTsCheckerWebpackPlugin())
		plugins.push(new ReactRefreshWebpackPlugin())
		return plugins
	} else {
		plugins.push(new MiniCssExtractPlugin())

		return plugins
	}
}
