import path from 'path'
import { BuildPaths } from '@packages/config-build'
import { buildWebpack } from '@packages/config-build'
import webpack from 'webpack'
import packageJson from './package.json'

type Mode = 'development' | 'production'

interface EnvironmentVariables {
	mode: Mode
	port?: number
	analyzer?: boolean
	device?: 'desktop' | 'mobile'
}

export default (env: EnvironmentVariables) => {
	console.log(/*__NAME_OF_NEW_MICROFRONTEND__*/)

	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		output: path.resolve(__dirname, 'build'),
		html: path.resolve(__dirname, 'public', 'template.html'),
		src: path.resolve(__dirname, 'src'),
		public: path.resolve(__dirname, 'public'),
	}

	const config = buildWebpack({
		port: env.port ?? 3001,
		mode: env.mode ?? 'development',
		device: env.device ?? 'desktop',
		analyzer: env.analyzer,
		paths,
	})

	config.plugins.push(
		new webpack.container.ModuleFederationPlugin({
			name: String(/*__NAME_OF_NEW_MICROFRONTEND__*/),
			filename: 'remoteEntry.js',
			exposes: {
				'./Router': './src/router/router.tsx',
			},
			shared: {
				...packageJson.dependencies,
				react: {
					eager: true,
					requiredVersion: packageJson.dependencies['react'],
				},
				'react-router-dom': {
					eager: true,
					requiredVersion: packageJson.dependencies['react-router-dom'],
				},
				'react-dom': {
					eager: true,
					requiredVersion: packageJson.dependencies['react-dom'],
				},
			},
		})
	)

	return config
}
