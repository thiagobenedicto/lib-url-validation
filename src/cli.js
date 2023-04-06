// cli.js vai maniputar informações do terminal
import chalk from 'chalk'
import fs from 'fs'
import getFile from "./index.js"
import validateList from './http-validate.js'

const filePath = process.argv // argument value

async function printList(valid, res, fileName = '') {
    if (valid) {
        console.log(chalk.yellow(`lista validada!`), chalk.black.bgGreen(fileName), await validateList(res))
    } else {
        console.log(chalk.yellow(`lista de links:`), chalk.black.bgGreen(fileName), res)
    }
}

async function processText(imput) {
    const filePath = imput[2]
    const valid = imput[3] === '--valida'

    try {
        fs.lstatSync(filePath)
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(chalk.red('arquivo ou diretório não exite'))
            return
        }
    }

    if (fs.lstatSync(filePath).isFile()) {
        const res = await getFile(filePath)
        printList(valid, res)
    } else if (fs.lstatSync(filePath).isDirectory()) {
        const fileList = await fs.promises.readdir(filePath)
        fileList.forEach(async fileName => {
            const list = await getFile(`${filePath}/${fileName}`)
            printList(valid, list, fileName)
        })
    }

}

processText(filePath)