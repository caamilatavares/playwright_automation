import { expect } from '@playwright/test';

export class Modal {

    constructor(page) {
        this.page = page
    }

    async validateModalMessage(message) {
        const modal = this.page.locator('#swal2-html-container')

        await expect(modal).toHaveText(message)
        await this.page.locator('.swal2-confirm').click()
    }
}

export class Alert {

    constructor(page) {
        this.page = page
    }

    async inputAlertsValidation(message) {
        await expect(this.page.locator("span[class$='alert']")).toHaveText(message)
    }
}

export class UrlValidation {
    constructor(page) {
        this.page = page
    }

    async validateUrl(path) {
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(path)
    }    
}