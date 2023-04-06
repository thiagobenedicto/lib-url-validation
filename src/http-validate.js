import chalk from "chalk"

function pullLinks(arrLinks) {
    return arrLinks.map((objLinks) => Object.values(objLinks).join())
}

async function checkStatus(arrURLs) {
    const arrStatus = await Promise.all(
        arrURLs.map(async (url) => {
            try {
                const response = await fetch(url)
                return `${response.status} - ${response.statusText}`
            } catch (err) {
                return treatError(err)
            }
        })
    )
    return arrStatus
}

function treatError(err) {
    if (err.cause.code === 'ENOTFOUND') {
        return 'Link não encontrado (URL inválida)'
    } else {
        return 'Erro inesperado'
    }
}

export default async function validateList(linksList) {
    const links = pullLinks(linksList)
    const status = await checkStatus(links)

    return linksList.map((object, index) => ({
        ...object,
        status: status[index]
    }))
}