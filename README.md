# playwright_automation

![poster](https://raw.githubusercontent.com/qaxperience/thumbnails/main/playwright-zombie.png)

## 🤘 Sobre

Repositório do projeto de testes automatizados do sistema Zombie Plus, construído no curso Playwright Zombie Edition! O Playwright é uma ferramenta de código aberto desenvolvida pela Microsoft que revoluciona a automação de testes em sistemas web, oferecendo uma abordagem eficaz e altamente confiável.

## 💻 Tecnologias
- Node.js
- Playwright
- Javascript
- Faker
- PostgreSQL
- GittHub  Actions

## Sobre o pipeline 
Os testes E2E com Playwright são executados no GitHub Actions após a build do client e da API, utilizando variáveis de ambiente definidas via GitHub Secrets, sem dependência de arquivos .env no CI.

Devido à separação entre frontend (localhost:3000) e API (localhost:3333), foi necessário tratar restrições de CORS no ambiente de CI. Para isso, o Playwright foi configurado para desabilitar a política de CORS somente no CI, mantendo o comportamento realista no ambiente local.

Essa abordagem garante:
- Execução estável dos testes no CI
- Maior segurança no gerenciamento de chaves usando Secrets
- Nenhum impacto no ambiente local ou de produção

## 🤖 Como executar
Observação: 

1. Clonar o repositório, instalar as dependências
```
npm install
```

2. Executar testes em Headless
```
npx playwright test 
```

3. Executar ver o relatório dos testes
```
npx playwright show-report
```

<hr>
Curso disponível em https://qaxperience.com
