const { test } = require('../support')

const { executeSQL } = require('../support/database')

const data = require('../support/fixtures/tvshows.json')

test.beforeAll(async ({request}) => {
    await executeSQL(`DELETE FROM tvshows;`)
    const session = await request.api.createSession()
    
    process.env.ADMIN_TOKEN = session.token
    process.env.ADMIN_ID = session.userId
})

test.beforeEach(async ({ page }) => {
    await page.login.visit()
    await page.auth.setSessionStorage(process.env.ADMIN_TOKEN, process.env.ADMIN_ID)
    await page.header.accessMenu('tvshows')
})

test('Should registrate new tv shows', async ({ page }) => {
    const tvShow = data.tvshow_1
    const message = `A série '${tvShow.title}' foi adicionada ao catálogo.`

    await page.media.createNewMedia(tvShow)
    await page.modal.validateModalMessage(message)

    movie.featured == true ?
        await page.media.verifyMediaSearch(tvShow.title)
        : ""
})

test('Should not registrate a new tv show without mandatory fields', async ({ page }) => {
    await page.media.goToMediaForm()
    await page.media.registrateMedia()

    const alertMessage = [
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório (apenas números)'
    ]

    await page.alert.inputAlertsValidation(alertMessage)
})

test('Should not registrate a tv show that already exisist', async ({ page, request }) => {
    const tvShow = data.tvshow_3
    const message = `O título '${tvShow.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`
    const token = process.env.ADMIN_TOKEN

    const companyId = await request.api.getCompanyId(token, tvShow.company)
    await request.api.createTvShow(token, companyId, tvShow)

    await page.media.createNewMedia(tvShow)
    await page.modal.validateModalMessage(message)
})

test('Should remove tv show from the list', async ({ page, request }) => {
    const tvShow = data.tvshow_4
    const token = process.env.ADMIN_TOKEN

    const companyId = await request.api.getCompanyId(token, tvShow.company)
    await request.api.createTvShow(token, companyId, tvShow)

    await page.media.deleteMedia(tvShow.title)
    await page.modal.validateModalMessage('Série removida com sucesso.')

    await page.media.verifyMediaExclusion(tvShow.title)
})

test('Shoud search for a tv show', async ({ page, request }) => {
    const tvShow = data.tvshow_5
    const token = process.env.ADMIN_TOKEN

    const companyId = await request.api.getCompanyId(token, tvShow.company)
    await request.api.createTvShow(token, companyId, tvShow)

    await page.media.searchMedia(tvShow.title)

    await page.media.verifyMediaSearch(tvShow.title)
})