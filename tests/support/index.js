const { test: base, expect } = require('@playwright/test')

const { Login } = require('../pages/LoginPage')
const { UrlValidation } = require('../pages/Components')
const { Movies } = require('../pages/MoviePage')
const { Toast } = require('../pages/Components')
const { Alert } = require('../pages/Components')
const { LandingPage } = require('../pages/LandingPage')


const test = base.extend({
    page: async ({ page }, use) => {
        await use({
            ...page,
            login: new Login(page),
            urlValidation: new UrlValidation(page),
            movies: new Movies(page),
            toast: new Toast(page),
            alert: new Alert(page),
            landingPage: new LandingPage(page)
        })
    }
})

export { test, expect }