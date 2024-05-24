
//Funcao para inserir numeros no campo
function insert(num) {
    var resultado = document.getElementById('resultado').innerHTML;
    document.getElementById('resultado').innerHTML = resultado + num;
}

//função para limpar o campo de resultado
function clear() {
    document.getElementById('resultado').innerHTML = "";
}

//função remove ultimo caractere de resultado

function back() {
    var resultado = document.getElementById('resultado').innerHTML;
    if (resultado.length > 0) {
        var lastChar = resultado.charAt(resultado.length - 1);
        if (isNaN(lastChar)) {
            resultado = resultado.substring(0, resultado.length - 1);
        } else {
            resultado = resultado.substring(0, resultado.length - 1);
        }
        document.getElementById('resultado').innerHTML = resultado;
    }
}


//Função que calcula expressao matematica
function calcular() {
    var expression = document.getElementById('resultado').innerHTML;

    if (expression === "" || expression.includes("/0")) {
        document.getElementById('resultado').innerHTML = "Error";
        return;
    }

    var operators = [];
    var numbers = [];
    var currentNumber = "";

    for (var i = 0; i < expression.length; i++) {
        var char = expression.charAt(i);
        if (isNaN(char)) {
            if (currentNumber !== "") {
                numbers.push(parseFloat(currentNumber));
                currentNumber = '';
            }
            operators.push(char);
        } else {
            currentNumber += char;
        }
    }
    if (currentNumber !== "") {
        numbers.push(parseFloat(currentNumber));
    }

    var result = calculate(numbers, operators);

    document.getElementById('resultado').innerHTML = result;
}

//Função para realizar calculos com base nos numeros e operadores 

function calculate(numbers, operators) {
    var result = numbers[0];
    var pendingOperator = null;
    var pendingNumber = null;

    for (var i = 1; i < numbers.length; i++) {
        if (operators[i - 1] === "*" || operators[i - 1] === "/") {
            if (pendingOperator !== null) {
                // Aplique a operação pendente antes de lidar com a nova
                if (pendingOperator === "*") {
                    result *= pendingNumber;
                } else if (pendingOperator === "/") {
                    if (pendingNumber === 0) {
                        return "Error";
                    }
                    result /= pendingNumber;
                }
                pendingOperator = null;
                pendingNumber = null;
            }

            if (operators[i - 1] === "*") {
                result *= numbers[i];
            } else if (operators[i - 1] === "/") {
                if (numbers[i] === 0) {
                    return "Error";
                }
                result /= numbers[i];
            }
        } else {
            if (pendingOperator !== null) {
                // Aplique a operação pendente antes de lidar com o novo número
                if (pendingOperator === "*") {
                    result *= pendingNumber;
                } else if (pendingOperator === "/") {
                    if (pendingNumber === 0) {
                        return "Error";
                    }
                    result /= pendingNumber;
                }
                pendingOperator = null;
                pendingNumber = null;
            }

            pendingOperator = operators[i - 1];
            pendingNumber = numbers[i];
        }
    }

    // Aplique a última operação pendente, se houver
    if (pendingOperator !== null) {
        if (pendingOperator === "*") {
            result *= pendingNumber;
        } else if (pendingOperator === "/") {
            if (pendingNumber === 0) {
                return "Error";
            }
            result /= pendingNumber;
        }
    }

    return result;
}

const resultado = document.getElementById('resultado');

// Função para limpar o campo de resultado
function clean() {
    resultado.innerHTML = '';
}

// Função para remover o último caractere do campo de resultado
function back() {
    resultado.innerHTML = resultado.innerHTML.slice(0, -1);
}

// Função para adicionar um valor ao campo de resultado
function insert(value) {
    resultado.innerHTML += value;
}

// Função para calcular a matematica no resultado
function calcular() {
    const expressao = resultado.innerHTML;
    const resultadoCalculo = eval(expressao);
    resultado.innerHTML = resultadoCalculo;
}