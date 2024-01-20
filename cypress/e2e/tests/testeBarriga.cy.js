import loc from '../../support/locators'
import '../../support/commandsContas'

describe("Testanto o site Barriga!", () => {

    beforeEach(() => {
        //login
        cy.login("vitorteste@gmail.com","123123")
    })

    it("Inserir Conta", () => {
        cy.resetApp()
        cy.acessarMenuContas()
        cy.inserirConta("Conta de teste")
        .wait(1000)
        
    })

    it("Alterar Conta", () => {
        cy.acessarMenuContas()
        cy.get('td:contains("Conta de teste")') 
            .next() 
            .find('i.fa-edit')
            .click()
        cy.get(loc.CONTAS.NOME).clear().type("Conta alterada")
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        .wait(1000)
    })

    it("Inserir Conta Repetida", () => {
        cy.acessarMenuContas()
        cy.get(loc.CONTAS.NOME).type("Conta alterada")
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should("contain", "code 400")
    })

    it("Inserir Movimentação", () => {
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type("Movimentação de Teste")
        cy.get(loc.MOVIMENTACAO.VALOR).type("1100")
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type("Jandir")
        cy.get(loc.MOVIMENTACAO.CONTA).select("Conta alterada")
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
    })

    it("Remover Movimentação", () => {
        cy.get(loc.MENU.EXTRATO).click(); // Clique no elemento com o locator definido como loc.MENU.EXTRATO
        cy.get(':nth-child(6) > .row > .col > [href="#"] > .far').click()       
    })

    it("Validar Extrato", () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.get(loc.EXTRATO.LINHAS).should("have.length", 6)
    })

    it("Validar Saldo", () => {

        cy.get(loc.MENU.HOME).click()
        cy.get('td:contains("Conta para extrato")')
        .next()
        .should("contain", "220")

    })


})
