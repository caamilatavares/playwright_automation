import { expect } from '@playwright/test'

export class Movies {
    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('/admin');
    }

    async goForm() {
        const formButton = "a[href$='register']"
        await expect(this.page.locator(formButton)).toBeVisible()

        await this.page.locator(formButton).click()
    }

    async sendForm() {
        await this.page.getByRole('button', { name: 'Cadastrar' })
            .click()
    }

    async createNewMovies(movie) {

        await this.goForm()

        await this.page.locator('#title').fill(movie.title)
        await this.page.locator('#overview').fill(movie.overview)

        await this.page.locator('#select_company_id .react-select__indicators')
            .click()

        await this.page.locator('.react-select__option')
            .filter({ hasText: movie.company })
            .click()

        await this.page.locator('#select_year .react-select__indicators')
            .click()

        await this.page.locator('.react-select__option')
            .filter({ hasText: movie.release_year })
            .click()

        await this.page.locator('input[name=cover]').setInputFiles('tests/support/fixtures' + movie.cover)

        movie.featured == true ?
            await this.page.locator('.featured .react-switch').click()
            : ""

        await this.sendForm()
    }

    async verifyFeaturedMovie(movieTitle) {
        await this.page.locator('.logout').click()

        const coverName = await this.page.locator(`img[alt='${movieTitle}']`)
        expect(coverName).toBeVisible()
    }

    async deleteMovie(title) {
        await this.page.reload()
        await this.page.waitForLoadState('networkidle')

        await this.page.locator(`tr:has-text("${title}")`)
            .locator('.remove-item')
            .click()

        await this.page.locator('.tooltip')
            .locator('.confirm-removal')
            .click()
    }

    async verifyMovieExclusion(title){
          await expect(this.page.locator(`tr:has-text("${title}")`))
          .toBeHidden()
    }

    async searchMovie(title){
        await this.page.getByPlaceholder('Busque pelo nome').fill(title)
        await this.page.locator('.actions')
          .locator("button[type=submit]").click()
    }

    async verifySearch(title){
        await expect(this.page.locator(`tr:has-text("${title}")`))
          .toBeVisible()
    }
}