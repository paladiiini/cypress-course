const locators = {

    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },

    MENU: {
        SETTINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTACAO: '[data-test=menu-movimentacao]',
        EXTRATO: '[data-test=menu-extrato]',
        HOME: '[data-test=menu-home]'
    },

    CONTAS: {
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        BTN_ALTERAR: '#td'
    },
    MESSAGE: '.toast-message',

    MOVIMENTACAO:{
        DESCRICAO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO: '[data-test=envolvido]',
        CONTA: '[data-test=conta]',
        STATUS: '[data-test=status]',
        BTN_SALVAR: '.btn-primary'
    },

    EXTRATO:{
        LINHAS: '.list-group > li'
    },

    Saldo:{
        FN_XP_SALDO_CONTA: nome => `//td[contains(., "${nome}")]/../td[2]`
    }
}

export default locators;