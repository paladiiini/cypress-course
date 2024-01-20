it("Somas teste!", function() {})

function soma(a, b) {
     return a + b;
 }

 const soma2 = (a, b) => {
     return a + b;
 }

 const soma3 = (a, b) => a + b;

 const soma4 = a => a + a;

console.log(soma(1, 4));
console.log(soma2(1, 4));
console.log(soma3(1, 4));
console.log(soma4(1));

//imprimir hello world
const hello = () => "Hello World!";

console.log(hello());

it("An function test!", function() {

    console.log("Function", this);

})

it("An arrow test!", () => {

    console.log("Arrow", this);

})