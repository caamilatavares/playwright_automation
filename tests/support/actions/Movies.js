import { expect } from '@playwright/test'

export class Movies {
    constructor(page, request) {
        this.page = page
        this.request = request
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

    async createNewMovies(title, overview, company, releaseYear, cover, featured) {

        await this.goForm()

        await this.page.locator('#title').fill(title)
        await this.page.locator('#overview').fill(overview)

        await this.page.locator('#select_company_id .react-select__indicators')
            .click()

        await this.page.locator('.react-select__option')
            .filter({ hasText: company })
            .click()

        await this.page.locator('#select_year .react-select__indicators')
            .click()

        await this.page.locator('.react-select__option')
            .filter({ hasText: releaseYear })
            .click()

        await this.page.locator('input[name=cover]').setInputFiles('tests/support/fixtures' + cover)

        featured == true ? 
            await this.page.locator('.featured .react-switch').click() 
            : ""

        await this.sendForm()
    }

    async verifyFeaturedMovie(movieTitle){
        await this.page.locator('.logout').click()

        const coverName = await this.page.locator(`img[alt='${movieTitle}']`)
        expect(coverName).toBeVisible()
    }
}