const { test: base, expect } = require('@playwright/test')

const { Login } = require('../actions/Login')
const { UrlValidation } = require('../actions/Components')
const { Movies } = require('../actions/Movies')
const { Toast } = require('../actions/Components')
const { Alert } = require('../actions/Components')
const { Leads } = require('../actions/Leads')


const test = base.extend({
    page: async ({ page }, use) => {

        const context = page

        context['leads'] = new Leads(page)
        context['login'] = new Login(page),
        context['urlValidation'] = new UrlValidation(page),
        context['movies'] = new Movies(page),
        context['toast'] = new Toast(page),
        context['alert'] = new Alert(page),

        await use(context)
    }
})

export { test, expect }