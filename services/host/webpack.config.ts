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
	SHOP_REMOTE_URL?: string
	ABOUT_REMOTE_URL?: string
}

export default (env: EnvironmentVariables) => {
	console.log(env)

	const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? 'http://localhost:3001'
	const ABOUT_REMOTE_URL = env.ABOUT_REMOTE_URL ?? 'http://localhost:3002'

	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		output: path.resolve(__dirname, 'build'),
		html: path.resolve(__dirname, 'public', 'template.html'),
		src: path.resolve(__dirname, 'src'),
		public: path.resolve(__dirname, 'public'),
	}

	const config = buildWebpack({
		port: env.port ?? 3000,
		mode: env.mode ?? 'development',
		device: env.device ?? 'desktop',
		analyzer: env.analyzer,
		paths,
	})

	config.plugins.push(
		new webpack.container.ModuleFederationPlugin({
			name: 'host',
			filename: 'remoteEntry.js',

			remotes: {
				shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
				about: `about@${ABOUT_REMOTE_URL}/remoteEntry.js`,
			},
			shared: {
				...packageJson.dependencies,
				react: {
					eager: true,
					// requiredVersion: packageJson.dependencies['react'],
				},
				'react-router-dom': {
					eager: true,
					// requiredVersion: packageJson.dependencies['react-router-dom'],
				},
				'react-dom': {
					eager: true,
					// requiredVersion: packageJson.dependencies['react-dom'],
				},
			},
		})
	)

	return config
}
