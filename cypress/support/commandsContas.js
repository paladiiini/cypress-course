import loc from './locators'

Cypress.Commands.add("acessarMenuContas", () => {

    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.CONTAS).click()

});

Cypress.Commands.add("inserirConta", (conta) => {

    cy.get(loc.CONTAS.NOME).type(conta)
    cy.get(loc.CONTAS.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should("contain", "Conta inserida com sucesso!")

});
