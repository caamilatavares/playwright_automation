const { test } = require('../support')

const data = require('../support/fixtures/movies.json')

const { executeSQL } = require('../support/database')

test.beforeAll(async () => {
    await executeSQL(`DELETE FROM movies;`)
})

test.beforeEach(async ({ page }) => {
    const email = 'admin@zombieplus.com'
    const password = 'pwd123'

    await page.login.visit()
    await page.login.submit(email, password)
    await page.urlValidation.validateUrl(/.*movies/)
})

test('Should registrate new movies', async ({ page }) => {
    const movie = data.movie_1

    const message = /Cadastro realizado com sucesso!/

    await page.movies.visit()
    await page.movies.createNewMovies(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.featured)
    await page.toast.validateToastMessage(message)

    movie.featured == true ? 
        await page.movies.verifyFeaturedMovie(movie.title)
        : ""
})

test('Should not registrate a new movie without mandatory fields', async ({ page }) => {
    await page.movies.visit()
    await page.movies.goForm()
    await page.movies.sendForm()

    const alertMessage = [
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'
    ]

    await page.alert.inputAlertsValidation(alertMessage)
})

test('Should not registrate a movie that already exisist', async ({ page, request }) => {
    const movie = data.movie_2
    const message = /Este conteúdo já encontra-se cadastrado no catálogo/
    const email = 'admin@zombieplus.com'
    const password = 'pwd123' 
    
    const token = await request.api.createSession(email, password)
    const companyId = await request.api.getCompanyId(token, movie.company)
    await request.api.createMovie(token, companyId, movie)
    
    await page.movies.createNewMovies(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.featured)
    await page.toast.validateToastMessage(message)
})

    