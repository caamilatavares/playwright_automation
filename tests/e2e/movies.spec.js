const { test } = require('../support')

const data = require('../support/fixtures/movies.json')

const { executeSQL } = require('../support/database')

test.beforeAll(async () => {
    await executeSQL(`DELETE FROM movies;`)
})

test.beforeEach(async ({ page }) => {
    const email = process.env.ADMIN_USER
    const password = process.env.ADMIN_PASSWORD

    await page.login.visit()
    await page.login.submit(email, password)
    await page.urlValidation.validateUrl(/.*movies/)
})

test('Should registrate new movies', async ({ page }) => {
    const movie = data.movie_1

    const message = `O filme '${movie.title}' foi adicionado ao catálogo.`

    await page.movies.visit()
    await page.movies.createNewMovies(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.featured)
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

    const companyId = await request.api.getCompanyId(movie.company)
    await request.api.createMovie(companyId, movie)
    
    await page.movies.createNewMovies(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.featured)
    await page.modal.validateModalMessage(message)
})

test('Should remove movie from the list', async ({ page, request }) => {
    const movie = data.movie_5

    const companyId = await request.api.getCompanyId(movie.company)
    await request.api.createMovie(companyId, movie)
    
    await page.movies.deleteMovie(movie.title)
    await page.modal.validateModalMessage('Filme removido com sucesso.')
    await page.movies.verifyMovieExclusion(movie.title)
})

test('Shoud search for a movie', async ({ page, request }) => {
    const movie = data.movie_6

    const companyId = await request.api.getCompanyId(movie.company)
    await request.api.createMovie(companyId, movie)

    await page.movies.searchMovie(movie.title)
    await page.movies.verifySearch(movie.title)
})