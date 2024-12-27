export type Mode = 'development' | 'production'

export interface EnvironmentVariables {
	port?: number
	mode: Mode
}

export interface BuildPaths {
	entry: string
	output: string
	html: string
	src: string
	public: string
}

export interface BuildWebpackOptions {
	paths: BuildPaths
	mode: Mode
	port?: number
	analyzer?: boolean
	device?: 'desktop' | 'mobile'
}
