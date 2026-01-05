const { test, expect } = require('../support')

import { faker } from '@faker-js/faker'

test('Should registrate a lead on the wait list', async ({ page }) => {
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  const randomName = faker.person.firstName()
  const randomEmail = faker.internet.email()

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(randomName, randomEmail)
  await page.toast.validateToastMessage(message)
});

test('Should not registrate twice with the same e-mail', async ({ page, request }) => {
  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  const randomName = faker.person.firstName()
  const randomEmail = faker.internet.email()

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      email: randomEmail,
      name: randomName
    }
  })

  expect(newLead.ok()).toBeTruthy()
  
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm(randomName, randomEmail);
  await page.toast.validateToastMessage(message);
})

test('Should not registrate a lead with incorrect e-mail', async ({ page }) => {
  const name = 'test'
  const email = 'test@automation'
  const message = 'Email incorreto'

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm(name, email);
  await page.alert.inputAlertsValidation(message);
});

test('Should not registrate without name', async ({ page }) => {
  const name = ''
  const email = 'test@automation.com'
  const message = 'Campo obrigatório'

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm(name, email);
  await page.alert.inputAlertsValidation(message);
});

test('Should not registrate without e-mail', async ({ page }) => {
  const name = 'test'
  const email = ''
  const message = 'Campo obrigatório'

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm(name, email);
  await page.alert.inputAlertsValidation(message);

});

test('Should not registrate without e-mail and name', async ({ page }) => {
  const name = ''
  const email = ''
  const message = [
    'Campo obrigatório',
    'Campo obrigatório'
  ]

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm(name, email);
  await page.alert.inputAlertsValidation(message);
});