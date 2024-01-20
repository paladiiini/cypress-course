/// <references types="cypress" />

describe('Test on functional level', () => {
    before(() => {
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.get('.input-group > .form-control').type('b@bb')
        cy.get(':nth-child(2) > .form-control').type('b')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Bem vindo').click()
    })

    //it('Registrar', () => {
    //    cy.get(':nth-child(2) > .nav-link').click()
    //    cy.get('.jumbotron > :nth-child(1) > .form-control').type('gabriel')
    //    cy.get('.input-group > .form-control').type('1@11')
    //    cy.get(':nth-child(3) > .form-control').type('11')
    //    cy.get('.btn').click()
    //})

    it('Should create an account', () => {
        cy.get('.dropdown-toggle').click()
        cy.get('[href="/contas"]').click()
        cy.get('[data-test=nome]').type('conta 1')
        cy.get('.btn').click()
        cy.get('.toast-success > .toast-message').should('contain', 'Conta inserida com sucesso!')
        cy.get('.toast-success > .toast-message').click()
    })

    it('Should update an account', () => {
        cy.get('.dropdown-toggle').click()
        cy.get('[href="/contas"]').click()
        //cy.get('i[title="Alterar id: 1978697"]').click()
        cy.get('table')
        .contains('td', 'conta 1')
        .parent('tr')
        .find('i.far.fa-edit')
        .click()
        cy.get('[data-test=nome]')
        .clear()
        .type('conta alterada')
        cy.get('.btn').click()
        cy.get('.toast-success > .toast-message').should('not.contain', 'Conta atualizada com sucesso!')
        cy.get('.toast-success > .toast-message').click() 
    })
    
    it('Should try to create a repeated account', () => {
        cy.get('[data-test=nome]')
        .clear()
        .type('conta alterada')
        cy.get('.btn').click() 
        cy.get('.toast-message').should('contain', 'Erro')
    })

    it.only('Should create a transaction', () => {
        cy.get('[data-test=menu-movimentacao] > .fas').click()
        cy.get('[data-test=descricao]').type('desc')
        cy.get('[data-test=valor]').type('123')
        cy.get('[data-test=envolvido]').type('inter')
        cy.get('.btn-primary').click()
        cy.get('.toast-message').should('contain', 'sucesso')
      
    })

    
})

