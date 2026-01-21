const { test: base, expect } = require('@playwright/test')

const { Login } = require('./actions/Login')
const { UrlValidation } = require('./actions/Components')
const { Movies } = require('./actions/Movies')
const { Modal } = require('./actions/Components')
const { Alert } = require('./actions/Components')
const { Leads } = require('./actions/Leads')
const { Api } = require('./api')
const { Auth } = require('./actions/Authentication')

const test = base.extend({
    page: async ({ page }, use) => {
        const context = page

        context['leads'] = new Leads(page)
        context['login'] = new Login(page)
        context['urlValidation'] = new UrlValidation(page)
        context['movies'] = new Movies(page)
        context['modal'] = new Modal(page)
        context['alert'] = new Alert(page)
        context['api'] = new Api(page)
        context['auth'] = new Auth(page)

        await use(context)
    },
    request: async ({ request }, use) => {
        const context = request

        context['api'] = new Api(request)

        await use(context)
    }
})

export { test, expect }