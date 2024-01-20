/// <references types="cypress" />

describe('esperas...', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload() 
    })

    it('Deve aguardar elemtno estar disponivel', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funciona')
    })

    it.only('Deve fazer retrys', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo')
        //.should('not.exist')
        .should('exist')
        .type('Funciona',{delay:100})  
    })

    it.only('Uso do find', () => {
        cy.get('#buttonList').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
        //cy.get('#lista li')
        //    .find('span')
        //    .should('contain', 'Item 2')
        cy.get('#lista li span')
            .should('contain', 'Item 2')
    })

    it.only('Uso do Timeout', () => {
    //    cy.get('#buttonDelay').click()
    //    cy.get('#novoCampo', {timeout:1000}).should('exist')

    //cy.get('#buttonList').click()
    //cy.wait(5000)
    //cy.get('#lista li span', {timeout:30000})
    //    .should('contain', 'Item 2')

    cy.get('#buttonListDOM').click()
    cy.get('#lista li span')
        .should('have.length', 1)
    cy.get('#lista li span')
        .should('have.length', 2)
    })

    it.only('Click Retry', () => {
        cy.get('#buttonCount')
            .click()
            .should('have.value', '1')
    })
    
    it.only('Should VS Then', () => {
        cy.get('#buttonListDOM').then($el => {
            //.should('have.length', 1)
            //console.log($el)
            expect($el).to.have.length(1)
            cy.get('#buttonList')
        })
          
            
    })
})
