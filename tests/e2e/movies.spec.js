const { test } = require('../support')

const data = require('../support/fixtures/movies.json')

const { executeSQL } = require('../support/database')

test.beforeEach(async ({ page }) => {
    const email = 'admin@zombieplus.com'
    const password = 'pwd123'

    await page.login.visit()
    await page.login.submit(email, password)
    await page.urlValidation.validateUrl(/.*movies/)
})

test('Should registrate new movies', async ({ page }) => {
    const movie = data.movie_1

    await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}';`)

    const message = /Cadastro realizado com sucesso!/

    await page.movies.visit()
    await page.movies.createNewMovies(movie.title, movie.overview, movie.company, movie.release_year)
    await page.toast.validateToastMessage(message)
})