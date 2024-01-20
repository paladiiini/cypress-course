it("Equality", () => {
    const a = 1;
    // O expect é para fazer uma asserção e comparar o valor de uma variável com um valor esperado
    expect(a).equal(1);
    expect(a, "Deveria ser 1").equal(1);
    // O to é para comparar o valor de uma variável com um valor esperado
    expect(a).to.be.equal(1);
    expect(a).not.to.be.equal(2);
})

it("Truthy", () => {
    // O true é para verificar se o valor é verdadeiro
    const a = true;
    const b = null;
    let c;

    expect(a).to.be.true;
    expect(a).not.to.be.false;
    expect(true).to.be.true;
    expect(b).to.be.null;
    expect(a).to.be.not.null;

})

it("Object Equality", () => {
    // O objeto é uma estrutura de dados que permite armazenar uma coleção de dados
    const obj = {
        a: 1,
        b: 2
    }

    expect(obj).equal(obj);
    expect(obj).equals(obj);
    expect(obj).eq(obj);
    expect(obj).to.be.equal(obj);
    // o Deep é para comparar objetos
    expect(obj).to.be.deep.equal({ a: 1, b: 2 });
    // o Eql é para comparar objetos
    expect(obj).eql({ a: 1, b: 2 });
    // o include é para verificar se o objeto possui a propriedade
    expect(obj).include({ a: 1 });
    // o have é para verificar se o objeto possui a propriedade
    expect(obj).to.have.property('b');
    expect(obj).to.have.property('b', 2);
    // O empty é para verificar se o objeto está vazio
    expect({}).to.be.empty;
    expect({ a: 1 }).not.to.be.empty;
})

it("Arrays", () => {
    const arr = [1, 2, 3];
    // O to have é para verificar se o array possui todos os valores
    expect(arr).to.have.members([1, 2, 3]);
    // O to include é para verificar se o array possui determinado valor
    expect(arr).to.include.members([1, 3]);
    expect(arr).to.not.be.empty;
    expect([]).to.be.empty;
})

it("Types", () => {
    const num = 1;
    const str = "String";

    expect(num).to.be.a('number');
    expect(str).to.be.a('string');
    expect({}).to.be.an('object');
    expect([]).to.be.an('array');
})

it("String", () => {
    const str = "String de teste";

    expect(str).to.be.equal("String de teste");
    expect(str).to.have.length(15);
    expect(str).to.contains("de");
    expect(str).to.match(/de/);
    expect(str).to.match(/^String/);
    expect(str).to.match(/teste$/);
    expect(str).to.match(/.{15}/);
    expect(str).to.match(/\w+/);
    expect(str).to.match(/\D+/);
})

it("Numbers", () => {
    const number = 4;
    const floatNumber = 5.2123;

    expect(number).to.be.equal(4);
    expect(number).to.be.above(3);
    expect(number).to.be.below(7);
    expect(floatNumber).to.be.equal(5.2123);
    expect(floatNumber).to.be.closeTo(5.2, 0.1);
    expect(floatNumber).to.be.above(5);
})