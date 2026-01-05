import { expect } from '@playwright/test'

export class Movies {
    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('/admin');
    }

    async goForm() {
        await this.page.locator("a[href$='register']").click()
    }

    async sendForm() {
        await this.page.getByRole('button', { name: 'Cadastrar' })
            .click()
    }

    async createNewMovies(title, overview, company, releaseYear) {

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

        await this.sendForm()
    }
}