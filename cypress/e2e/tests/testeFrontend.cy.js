import loc from '../../support/locators'
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'

describe("Testanto o site Barriga!", () => {

    let token

    after(() => {
        cy.clearLocalStorage()
    })

    before(() => {
        
    })

    beforeEach(() => {
        buildEnv()
        cy.login('Conta errada', 'senha errada')
    })

    it("Alterar Conta", () => {
        cy.intercept('PUT', '/contas/**', {
            id: 3,
            nome: 'Conta Vitor',
            visivel: true,
            usuario_id: 1
        }).as('saveConta')
        cy.acessarMenuContas()
        cy.get('td:contains("Conta Vitor")') 
            .next() 
            .find('i.fa-edit')
            .click()
        cy.get(loc.CONTAS.NOME).clear().type("Conta alterada")
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        .wait(1000)
    })

    it("Inserir Conta Repetida", () => {
        cy.intercept('POST', '/contas', {
            statusCode: 400,
            body: {
                id: 3,
                nome: 'Conta Vitor',
                visivel: true,
                usuario_id: 1
            },
            headers: {
                'status': 'error',
                'response': 'Já existe uma conta com esse nome!'
            }
        }).as('saveContaMesmoNome')

        cy.acessarMenuContas()

        cy.get(loc.CONTAS.NOME).type("Conta Vitor")
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should("contain", "Re")
    })


    it("Inserir Movimentação", () => {
        cy.intercept('POST', '/transacoes', {
            id: 31431,
            descricao: "Movimentação de Teste",
            envolvido: "Jandir",
            observacao: null,
            tipo: "REC",
            data_transacao: "2021-08-04T03:00:00.000Z",
            data_pagamento: "2021-08-04T03:00:00.000Z",
            valor: "1100.00",
            status: false,
            conta_id: 3,
            usuario_id: 1,
            transferencia_id: null,
            parcelamento_id: null
        }).as('saveMovimentacao')
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type("Movimentação de Teste")
        cy.get(loc.MOVIMENTACAO.VALOR).type("1100")
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type("Jandir")
        cy.get(loc.MOVIMENTACAO.CONTA).select("Conta Vitor")
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
    })

    it("Remover Movimentação", () => {
        cy.intercept('DELETE', '/transacoes/**', {
            statusCode: 204,
            body: {
                id: 3,
                nome: 'Conta Vitor',
                visivel: true,
                usuario_id: 1
            },
            headers: {
                'status': 'success',
                'response': 'sucess'
            }
        }).as('saveMovimentacao')
    })

    it("Validar Extrato", () => {
        cy.intercept('GET', '/extrato/**', [{
            conta: "Conta para movimentacoes",
            id: 31431,
            descricao: "Movimentação de Teste",
            envolvido: "Jandir",
            observacao: null,
            tipo: "REC",
            data_transacao: "2021-08-04T03:00:00.000Z",
            data_pagamento: "2021-08-04T03:00:00.000Z",
            valor: "1100.00",
            status: false,
            conta_id: 3,
            usuario_id: 1,
            transferencia_id: null,
            parcelamento_id: null
        },
        {
            conta: "Conta para movimentacoes",
            id: 31432,
            descricao: "Movimentação para exclusao",
            envolvido: "Jandir",
            observacao: null,
            tipo: "REC",
            data_transacao: "2021-08-04T03:00:00.000Z",
            data_pagamento: "2021-08-04T03:00:00.000Z",
            valor: "1100.00",
            status: false,
            conta_id: 3,
            usuario_id: 1,
            transferencia_id: null,
            parcelamento_id: null
        }
        ]).as('saveMovimentacao')
        cy.get(loc.MENU.EXTRATO).click()
        cy.get(loc.EXTRATO.LINHAS).should("have.length", 2)
    })

    it("Validar Saldo", () => {
        cy.intercept('GET', '/saldo', [{
            conta_id: 999,
            conta: "Carteira",
            saldo: "100.00"
        },
        {
            conta_id: 9909,
            conta: "Banco",
            saldo: "10000000.00"
        },
        {
            conta_id: 3,
            conta: "Conta para extrato",
            saldo: "220.00"
        }
        ]).as('saldo')
        cy.get(loc.MENU.HOME).click()
        cy.get('td:contains("Carteira")')
        .next()
        .should("contain", "100")

    })

    it('Should validate data send to create an account', () => {
        cy.intercept('POST', '/contas', {
            statusCode: 201,
            body: {
                id: 3,
                nome: 'Conta Vitor',
                visivel: true,
                usuario_id: 1
            },
            headers: {
                'status': 'success',
                'response': 'sucess'
            }
        }).as('saveConta')

        cy.acessarMenuContas()

        cy.intercept('GET', '/contas', [{
            id: 1,
            nome: 'Carteira',
            visivel: true,
            usuario_id: 1
        },
        {
            id: 2,
            nome: 'Banco',
            visivel: true,
            usuario_id: 1
        },
        {
            id: 3,
            nome: 'Conta Vitor',
            visivel: true,
            usuario_id: 1
        },
        
        ]).as('contasSave')

        cy.get(loc.CONTAS.NOME).type("Conta Vitor")
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should("contain", "Re")
    })


})