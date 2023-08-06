const operations = ["add", "substract", "multiply", "divide"];
let currentNumber = 0;

function add(inputNumber) {
    return currentNumber + inputNumber;
}

function substract(inputNumber) {
    return currentNumber - inputNumber;
}

function multiply(inputNumber) {
    return currentNumber * inputNumber;
}

function divide(inputNumber) {
    return currentNumber / inputNumber;
}

function operate(inputNumber, operator) {
    switch (operator) {
        case "add":
            currentNumber = add(inputNumber);
            break;
        case "substract":
            currentNumber = substract(inputNumber);
            break;
        case "multiply":
            currentNumber = multiply(inputNumber);
            break;
        case "divide":
            if (inputNumber === 0) return null;
            currentNumber = divide(inputNumber);
            break;
    }
    return currentNumber;
}