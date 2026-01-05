import { test, expect } from '@playwright/test';

export class Toast {

    constructor(page) {
        this.page = page
    }

    async validateToastMessage(message) {
        await expect(this.page.locator('.toast')).toHaveText(message)
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