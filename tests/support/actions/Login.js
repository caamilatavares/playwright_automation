import { expect } from '@playwright/test';

// Class to define components and actions related to Login feature
export class Login {
    constructor(page) {
        this.page = page;
    }

    async visit() {
        await this.page.goto('/admin/login')
    }

    // Verify if login was made correctly by validating user name in logged area
    async validateLogin(userName){
        await this.page.waitForSelector('.navbar')
        expect(this.page.locator('.logged-user')).toHaveText('Olá, ' + userName)
    }

    // Submit login form by putting the credentials
    async submit(email, password) {
        const form = this.page.locator('.login-form')
        
        await form.getByPlaceholder('E-mail').fill(email)
        await form.getByPlaceholder('Senha').fill(password)
        
        await this.page.getByRole('button', 'submit').click()
    }
}