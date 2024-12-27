const fs = require('fs')
const path = require('path')

const [NewMicrofrontendModuleNameInEnv] = process.argv.slice(3)

const envValue = NewMicrofrontendModuleNameInEnv
	? NewMicrofrontendModuleNameInEnv.slice(30)
	: 'default_value'

const tsconfigData = {
	extends: '../tsconfig.base.json',
	compilerOptions: {
		outDir: './dist/',
		baseUrl: '.',
		paths: {
			'@/*': ['./src'],
		},
	},
}

const tsconfigJson = JSON.stringify(tsconfigData, null, 2)

// Путь к файлу tsconfig.json
const filePath = path.resolve(`../services/${envValue}`)

// Функция для записи данных в файл JSON
function writeJsonToFile(filePath, data) {
	fs.writeFile(filePath, data, err => {
		if (err) {
			console.error(`Ошибка при записи файла ${filePath}:`, err)
		} else {
			console.log(`Файл ${filePath} успешно создан и записан.`)
		}
	})
}

writeJsonToFile(filePath, tsconfigJson)
