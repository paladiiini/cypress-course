describe("Cypress basics", () => {
    it("Should visit a page and assert title", () => {
        // O visit é para acessar uma página
        cy.visit("https://wcaquino.me/cypress/componentes.html")
        // O title é para verificar o título da página
        cy.title().should("be.equal", "Campo de Treinamento")
        // O should é para verificar se o título da página contém determinado texto
        cy.title().should("contain", "Campo")
        // cy.title().debug().should("contain", "Campo")
        cy.title()
            .should("be.equal", "Campo de Treinamento")
            .and("contain", "Campo")

        let syncTitle = cy.title()

        cy.title().then(title => {
            console.log(title)
            cy.get("#formNome").type(title)
            
            syncTitle = title

        })

        cy.get("[data-cy=dataSobrenome]").then($el => {
            $el.val("Teste")
        })

    })

it("Should find and interact with an element", () => {
    cy.visit("https://wcaquino.me/cypress/componentes.html")
    // O get é para buscar um elemento
    cy.get("#buttonSimple")
        .click()
        .should("have.value", "Obrigado!")
})

it("Pause and Debug", () => {
    cy.visit("https://wcaquino.me/cypress/componentes.html")
    cy.get("#buttonSimple")
        .click()
        .pause()
    cy.get("#buttonSimple")
        .should("have.value", "Obrigado!")

})
})