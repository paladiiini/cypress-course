describe("Ordem de Busca", () => {

    beforeEach(() => {
        cy.visit("https://wcaquino.me/cypress/componentes.html")
    })

    it("using jquery selector", () => {

        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input').click()
        cy.get("[onclick*='Francisco']").click()  
        cy.get("#tabelaUsuarios td:contains('Doutorado'):eq(0) ~ td:eq(3) > input").click()
        cy.get("#tabelaUsuarios tr:contains('Doutorado'):eq(0) td:eq(6) input").click()
    })

})