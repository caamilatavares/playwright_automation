import { expect } from '@playwright/test';

export class Login {
    constructor(page) {
        this.page = page;
    }

    async visit() {
        await this.page.goto('/admin/login')
    }

    async submit(email, password) {
        const form = this.page.locator('.login-form')
        
        await form.getByPlaceholder('E-mail').fill(email)
        await form.getByPlaceholder('Senha').fill(password)
        
        await this.page.getByRole('button', 'submit').click()
    }
}