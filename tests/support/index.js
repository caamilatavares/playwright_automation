const { test: base, expect } = require('@playwright/test')

const { Login } = require('./actions/Login')
const { Modal } = require('./actions/Components')
const { Alert } = require('./actions/Components')
const { Leads } = require('./actions/Leads')
const { Api } = require('./api')
const { Auth } = require('./actions/Authentication')
const { Media } = require('./actions/Media')
const { Header } = require('./actions/Components')

const test = base.extend({
    page: async ({ page }, use) => {
        const context = page

        context['leads'] = new Leads(page)
        context['login'] = new Login(page)
        context['modal'] = new Modal(page)
        context['alert'] = new Alert(page)
        context['api'] = new Api(page)
        context['auth'] = new Auth(page)
        context['media'] = new Media(page)
        context['header'] = new Header(page)

        await use(context)
    },
    request: async ({ request }, use) => {
        const context = request

        context['api'] = new Api(request)

        await use(context)
    }
})

export { test, expect }