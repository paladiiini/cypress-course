import loc from '../../support/locators'
import '../../support/commandsContas'

describe("Testanto o site Barriga!", () => {

    let token

    before(() => {
        cy.getToken("vitorteste@gmail.com","123123").then(tkn => {
            token = tkn
        })
    })

    beforeEach(() => {
        //login
        cy.login("vitorteste@gmail.com","123123")
        cy.resetRest(token)
    })

    it("Inserir Conta", () => {
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/contas',
            //headers: { Authorization: `JWT ${token}` },
            body: {
                nome: "Vitor Paladini"
            }
        }).as('response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Vitor Paladini')
        })
    })

    it("Alterar Conta", () => {
        cy.request({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/contas',
            //headers: { Authorization: `JWT ${token}` },
            qs: {
                nome: "Conta para alterar"
            }
        }).then(res => {
            cy.request({
                method: 'PUT',
                url: `https://barrigarest.wcaquino.me/contas/${res.body[0].id}`,
                //headers: { Authorization: `JWT ${token}` },
                body: {
                    nome: "Conta alterada via rest"
                }
            }).as('response')
        }).then(res => {
            expect(res.status).to.be.equal(200)
        })
    })

    it('Criar transação', () => {
        cy.getContaByName('Conta para movimentacoes')
        .then(contaId => {
            cy.request({
                method : 'POST',
                url : 'https://barrigarest.wcaquino.me/transacoes',
                //headers : { Authorization: `JWT ${token}` },
                body : {
                    conta_id: contaId,
                    data_pagamento: '12/05/2023',
                    data_transacao: '12/05/2023',
                    descricao: "desc",
                    envolvido: "inter",
                    status: true,
                    tipo: "REC",
                    valor: "123"
                }
            })
        })
    })

    it('Validar saldo', () => {
        cy.request({
            method : 'GET',
            url : 'https://barrigarest.wcaquino.me/saldo',
            //headers : { Authorization: `JWT ${token}` }
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if(c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('534.00')
        })
    })

    it('Remover movimentação', () => {
        cy.request({
            method : 'GET',
            url : 'https://barrigarest.wcaquino.me/transacoes',
            //headers : { Authorization: `JWT ${token}` },
            qs: {
                descricao: "Movimentacao para exclusao" }
            }).then(res => {
                cy.request({
                    method : 'DELETE',
                    url : `https://barrigarest.wcaquino.me/transacoes/${res.body[0].id}`,
                    //headers : { Authorization: `JWT ${token}` }
                }).its('status').should('be.equal', 204)
        })
    })

})