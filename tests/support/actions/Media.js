import { expect } from "playwright/test"

export class Media {
    constructor(page){
        this.page = page
    }

    async goToMediaForm() {
        const formButton = "a[href$='register']"
        await expect(this.page.locator(formButton)).toBeVisible()

        await this.page.locator(formButton).click()
    }

    async registrateMedia() {
        await this.page.getByRole('button', { name: 'Cadastrar' })
            .click()
    }

    async createNewMedia(media){
        await this.goToMediaForm()

        await this.page.locator('#title').fill(media.title)
        await this.page.locator('#overview').fill(media.overview)

        media.type == 'TV Show' ? 
            await this.page.locator('#seasons').fill(media.seasons)
            : ""

        await this.page.locator('#select_company_id .react-select__indicators')
            .click()
        await this.page.locator('.react-select__option')
            .filter({ hasText: media.company })
            .click()

        await this.page.locator('#select_year .react-select__indicators')
            .click()
        await this.page.locator('.react-select__option')
            .filter({ hasText: media.release_year })
            .click()

        await this.page.locator('input[name=cover]').setInputFiles('tests/support/fixtures' + media.cover)

        media.featured == true ?
            await this.page.locator('.featured .react-switch').click()
            : ""   
        
        await this.registrateMedia()
    }

    async verifyFeaturedMedia(title) {
        await this.page.locator('.logout').click()
        this.page.waitForLoadState('networkidle')

        const coverName = await this.page.locator(`img[alt='${title}']`)
        expect(coverName).toBeVisible()
        this.page.screenshot({fullPage: true})
    }

    async searchMedia(title){
        await this.page.getByPlaceholder('Busque pelo nome').fill(title)
        await this.page.locator('.actions')
          .locator("button[type=submit]").click()
    }

    async verifyMediaSearch(title){
        await expect(this.page.locator(`tr:has-text("${title}")`))
          .toBeVisible()
    }

    async deleteMedia(title) {
        await this.page.reload()
        await this.page.waitForLoadState('networkidle')

        await this.page.locator(`tr:has-text("${title}")`)
            .locator('.remove-item')
            .click()

        await this.page.locator('.tooltip')
            .locator('.confirm-removal')
            .click()
    }

    async verifyMediaExclusion(title){
          await expect(this.page.locator(`tr:has-text("${title}")`))
          .toBeHidden()
    }
}