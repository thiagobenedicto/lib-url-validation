import fs from 'fs'
import chalk from 'chalk'

function getLinks(text) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm
    const listLinks = [...text.matchAll(regex)]
    const res = listLinks.map(link => ({[link[1]]: link[2]}))
    return res.length !== 0 ? res : chalk.red('não há links no arquivo')
}

function errException(err) {
    throw new Error(chalk.redBright(err.code, 'arquivo não identificado'))
}

// async/await

async function getFile(filePath) {
    try { // no caso de sucesso
        const encoding = 'utf-8'
        const texto = await fs.promises.readFile(filePath, encoding)
        return getLinks(texto)
    } catch(err) {
        errException(err)
    }
}

export default getFile