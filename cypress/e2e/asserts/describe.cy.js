/// reference types="cypress" />

// O it é para definir um caso de teste
it("Meu Primeiro Teste!", () => {
 
})

// O describe é para agrupar casos de teste
describe("Grupo de testes para estudos!", () => {
    describe("Grupo de testes para estudos 2!", () => {
// O only é para executar apenas um caso de teste ou um grupo de testes (executa o ultimo only)
        it.only("Meu Terceiro Teste!", () => {
 
        })
    })
// O skip é para pular um caso de teste
    it.skip("Meu Segundo Teste!", () => {
 
    })
})