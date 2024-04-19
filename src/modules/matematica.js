const PI = 3.14;
let array = ["dos", "cuatro", "ocho", "diez"];
function sumar(x, y) {
 let resultado = x + y
 return resultado
}
function restar(x, y) {
 let resultado = x - y
 return resultado
}

const multiplicar = (a, b) => {
 let resultado = a * b
 return resultado
};

const dividir = (a, b) => {
 let resultado = a / b
 return resultado
    
};
    
// Exporto todo lo que yo quiero exponer del módulo hacia el exterior.
export {PI, sumar, restar, multiplicar, dividir, array};