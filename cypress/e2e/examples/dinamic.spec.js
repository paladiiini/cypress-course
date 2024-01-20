/// <references types="cypress" />

describe('Dinimic tests', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    
    const foods  = [0 , 1, 2, 3]
    foods.forEach(food => {
        it(`Cadastro com a comida ${food}`, () => {
            cy.get('#formNome').type('Usuario')
            cy.get('#formSobrenome').type('QUalquer')
            cy.get(`[name=formSexo][value=F]`).click()
            cy.get(`table#formComidaFavorita tbody td:eq(${food}) > input`).click()
            cy.get('#formEscolaridade').select('Superior')
            cy.get('#formEsportes').select('Corrida')
            cy.get('#formCadastrar').click()    
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')

        })
    })

    it.only('Deve selecionar todos usando o each', () => {
        cy.get('#formNome').type('Usuario')
            cy.get('#formSobrenome').type('QUalquer')
            cy.get(`[name=formSexo][value=F]`).click()
    
            cy.get(`[name=formComidaFavorita]`).each($el => {
              // $el.click()
              if($el.val() != 'vegetariano')    
                    cy.wrap($el).click()

            })
            
            cy.get('#formEscolaridade').select('Superior')
            cy.get('#formEsportes').select('Corrida')
            cy.get('#formCadastrar').click()    
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
        //    cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')

    })
})