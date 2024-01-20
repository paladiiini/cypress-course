describe("Work with dynamic elements", () => {

    beforeEach(() => {
        cy.visit("https://wcaquino.me/cypress/componentes.html")
    })

    const food = ['carne', 'frango', 'pizza', 'vegetariano']

    it("Cadasctro com comida variada", () => {

        cy.get("#formNome").type("Usuario")
        cy.get("#formSobrenome").type("Qualquer")
        cy.get("[name=formSexo][value=M]").click()
        cy.get("[name=formComidaFavorita]").each($el => {
            // $el.click()
            if ($el.val() != 'vegetariano')
                cy.wrap($el).click()
        })
        cy.get("#formEscolaridade").select("Doutorado")
        cy.get("#formEsportes").select("Corrida")
        cy.get("#formCadastrar").click()
        cy.get("#resultado > :nth-child(1)").should("contain", "Cadastrado!")

    })

    it.only("Deve selecionar todos usando o each", () => {})

    food.forEach(food => {
        it.only(`Cadastro com comida ${food}`, () => {
            cy.get("#formNome").type("Usuario")
            cy.get("#formSobrenome").type("Qualquer")
            cy.get("[name=formSexo][value=M]").click()
            //Clicando em uma comida por vez
            cy.get("[name=formComidaFavorita]").each($el => {
                if($el.val() == food)
                    cy.wrap($el).click()
                
            })
            cy.get("#formEscolaridade").select("Doutorado")
            cy.get("#formEsportes").select("Corrida")
            cy.get("#formCadastrar").click()
            cy.get("#resultado > :nth-child(1)").should("contain", "Cadastrado!")
        })
    })
})


