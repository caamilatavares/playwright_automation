const { test } = require('../support')

const data = require('../support/fixtures/movies.json')

const { executeSQL } = require('../support/database')

test.beforeAll(async ({ request }) => {
    await executeSQL(`DELETE FROM movies;`)
    const session = await request.api.createSession()

    process.env.ADMIN_TOKEN = session.token
    process.env.ADMIN_ID = session.userId
})

test.beforeEach(async ({ page }) => {
    await page.login.visit()
    await page.auth.setSessionStorage(process.env.ADMIN_TOKEN, process.env.ADMIN_ID)
    await page.movies.visit()
})

test('Should registrate new movies', async ({ page }) => {
    const movie = data.movie_1

    const message = `O filme '${movie.title}' foi adicionado ao catálogo.`

    await page.movies.visit()
    await page.movies.createNewMovies(movie)
    await page.modal.validateModalMessage(message)

    movie.featured == true ?
        await page.movies.verifyFeaturedMovie(movie.title)
        : ""
})

test('Should not registrate a new movie without mandatory fields', async ({ page }) => {
    await page.movies.visit()
    await page.movies.goForm()
    await page.movies.sendForm()

    const alertMessage = [
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório'
    ]

    await page.alert.inputAlertsValidation(alertMessage)
})

test('Should not registrate a movie that already exisist', async ({ page, request }) => {
    const movie = data.movie_2
    const message = `O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`
    const token = process.env.ADMIN_TOKEN

    const companyId = await request.api.getCompanyId(token, movie.company)
    await request.api.createMovie(token, companyId, movie)

    await page.movies.createNewMovies(movie)
    await page.modal.validateModalMessage(message)
})

test('Should remove movie from the list', async ({ page, request }) => {
    const movie = data.movie_5
    const token = process.env.ADMIN_TOKEN

    const companyId = await request.api.getCompanyId(token, movie.company)
    await request.api.createMovie(token, companyId, movie)

    await page.movies.deleteMovie(movie.title)
    await page.modal.validateModalMessage('Filme removido com sucesso.')
    await page.movies.verifyMovieExclusion(movie.title)
})

test('Shoud search for a movie', async ({ page, request }) => {
    const movie = data.movie_6
    const token = process.env.ADMIN_TOKEN

    const companyId = await request.api.getCompanyId(token, movie.company)
    await request.api.createMovie(token, companyId, movie)

    await page.movies.searchMovie(movie.title)
    await page.movies.verifySearch(movie.title)
})