import { expect } from '@playwright/test';

// Class to define common components between features

// Class to define modal component
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

// Class to define alert component
export class Alert {

    constructor(page) {
        this.page = page
    }

    async inputAlertsValidation(message) {
        await expect(this.page.locator("span[class$='alert']")).toHaveText(message)
    }
}

// Class to define header components
export class Header {
    constructor(page){
        this.page = page
    }

    async accessMenu(path){
        await this.page.goto('/admin')
        await this.page.locator(`a[href='/admin/${path}']`)
            .click()
    }
}