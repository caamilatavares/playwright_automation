const { test } = require('../support')

test('Should do login as an administrator', async ({page}) => {
  const email = 'admin@zombieplus.com'
  const password = 'pwd123'

  await page.login.visit()
  await page.login.submit(email, password)
  
  await page.urlValidation.validateUrl(/.*movies/)
}) 

test('Should not do login with wrong e-mail', async ({ page }) => {
  const email = 'wrongemail@zombieplus.com'
  const password = 'pwd123'

  await page.login.visit()
  await page.login.submit(email, password)
  
  const message = /Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente/
  await page.toast.validateToastMessage(message)
})

test('Should not do login with wrong password', async ({ page }) => {
  const email = 'admin@zombieplus.com'
  const password = 'pwd321'

  await page.login.visit()
  await page.login.submit(email, password)
  
  const message = /Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente/
  await page.toast.validateToastMessage(message)
})

test('Should not do login without credentials', async ({ page }) => {
  const email = ''
  const password = ''
  const message = [
    'Campo obrigatório',
    'Campo obrigatório'
  ]
  
  await page.login.visit()
  await page.login.submit(email, password)
  
  await page.alert.inputAlertsValidation(message)
})