const { test: base, expect } = require('@playwright/test')

const { Login } = require('../pages/LoginPage')
const { UrlValidation } = require('../pages/Components')
const { Movies } = require('../pages/MoviePage')
const { Toast } = require('../pages/Components')
const { Alert } = require('../pages/Components')
const { LandingPage } = require('../pages/LandingPage')


const test = base.extend({
    page: async ({ page }, use) => {

        const context = page

        context['landingPage'] = new LandingPage(page)
        context['login'] = new Login(page),
        context['urlValidation'] = new UrlValidation(page),
        context['movies'] = new Movies(page),
        context['toast'] = new Toast(page),
        context['alert'] = new Alert(page),

        await use(context)
    }
})

export { test, expect }