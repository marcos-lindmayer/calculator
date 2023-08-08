let previousNumber = 0;
let currentNumber = "0";
let operator = null;
let hasDecimal = false;

let currentScreen = document.querySelector('.currentScreen');
let pastScreen = document.querySelector('.pastScreen');

function updateDisplay() {
    const currentScreenElement = document.querySelector('.currentScreen');
    const pastScreenElement = document.querySelector('.pastScreen');
  
    currentScreenElement.textContent = currentNumber;
    pastScreenElement.textContent = previousNumber + (operator ? ` ${operatorSymbol[operator]} ` : "");
  }

function operatorSymbol(op) {
  switch (op) {
    case "add": return "+";
    case "subtract": return "-";
    case "multiply": return "*";
    case "divide": return "/";
  }
}

function enterNumber(num) {
  if (currentNumber === "0" && num !== 0) {
    currentNumber = num;
  } else {
    currentNumber += num;
  }
  updateDisplay();
}

function enterFloat() {
  if (hasDecimal) return;
  currentNumber += '.';
  hasDecimal = true;
  updateDisplay();
}

function enterOperator(newOperator) {
  if (hasDecimal) currentNumber = parseFloat(currentNumber);
  previousNumber = currentNumber;
  currentNumber = "0";
  operator = newOperator;
  hasDecimal = false;
  updateDisplay();
}
  
  function add(newNum) {
    return currentNumber + newNum;
  }
  
  function subtract(newNum) {
    return currentNumber - newNum;
  }
  
  function multiply(newNum) {
    return currentNumber * newNum;
  }
  
  function divide(newNum) {
    return currentNumber / newNum;
  }
  
  function operate(inputNumber) {
    switch (operator) {
      case "add":
        currentNumber = add(inputNumber);
        break;
      case "subtract":
        currentNumber = subtract(inputNumber);
        break;
      case "multiply":
        currentNumber = multiply(inputNumber);
        break;
      case "divide":
        if (inputNumber === 0) return null;
        updateDisplay();
        currentNumber = divide(inputNumber);
        break;
    }
    currentNumber = Math.round(currentNumber * 10000) / 10000; // Limiting to 4 decimal points
    return currentNumber;
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
  });  