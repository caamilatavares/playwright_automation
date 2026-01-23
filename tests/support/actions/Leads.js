import { expect } from '@playwright/test';

// Class to define components and actions related to leads feature
export class Leads {
    constructor(page) {
        this.page = page;
    }

    // Visit the landing page
    async visit() {
        await this.page.goto('/');
    }

    // Open lead modal to registrate the lead
    async openLeadModal() {
        await this.page.getByRole('button', { name: /Aperte o play/ }).click();

        await expect(
            this.page.getByTestId('modal').getByRole('heading')
        ).toHaveText('Fila de espera')
    }

    // Submit the lead
    async submitLeadForm(name, email) {
        await this.page.getByPlaceholder(/Informe seu nome/).fill(name);
        await this.page.getByPlaceholder(/Informe seu email/).fill(email);
    
        await this.page.getByRole('button', { name: /entrar na fila/ }).click();
    }
}