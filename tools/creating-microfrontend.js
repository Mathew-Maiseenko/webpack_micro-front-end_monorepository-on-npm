const fs = require('fs')
const path = require('path')

const [NewMicrofrontendModuleNameInEnv] = process.argv.slice(3)

const envValue = NewMicrofrontendModuleNameInEnv
	? NewMicrofrontendModuleNameInEnv.slice(30)
	: 'default_value'

console.log(envValue)

// Функция для копирования и обработки файлов
function copyFiles(src, dest) {
	// Читаем содержимое исходной папки
	fs.readdir(src, (err, files) => {
		if (err) {
			console.error(`Ошибка при чтении папки ${src}:`, err)
			return
		}

		// Создаем целевую папку, если она не существует
		if (!fs.existsSync(dest)) {
			fs.mkdirSync(dest, { recursive: true })
		}

		// Копируем и обрабатываем каждый файл из исходной папки в целевую
		files.forEach(file => {
			const srcPath = path.join(src, file)
			const destPath = path.join(dest, file)

			// Проверяем, является ли файл директорией
			fs.stat(srcPath, (err, stats) => {
				if (err) {
					console.error(
						`Ошибка при получении информации о файле ${srcPath}:`,
						err
					)
					return
				}

				if (stats.isDirectory()) {
					// Рекурсивно копируем содержимое директории
					copyFiles(srcPath, destPath)
				} else {
					// Читаем и обрабатываем файл перед копированием
					fs.readFile(srcPath, 'utf8', (err, data) => {
						if (err) {
							console.error(`Ошибка при чтении файла ${srcPath}:`, err)
							return
						}

						// Заменяем переменную в содержимом файла
						const processedData = data.replace(
							/\/\*__NAME_OF_NEW_MICROFRONTEND__\*\//g,
							envValue
						)

						// Записываем обработанный файл в целевую папку
						fs.writeFile(destPath, processedData, err => {
							if (err) {
								console.error(`Ошибка при записи файла ${destPath}:`, err)
							} else {
								console.log(
									`Файл ${srcPath} успешно скопирован и обработан в ${destPath}`
								)
							}
						})
					})
				}
			})
		})
	})
}

const sourceFolder = path.resolve('./micro-frontend-modal')
const destinationFolder = path.resolve(`../services/${envValue}`)

copyFiles(sourceFolder, destinationFolder)
