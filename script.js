let previousNumber = null;
let prevpreviousNumber = null;
let currentNumber = "0";
let operator = null;
let hasDecimal = false;
let resultDisplayed = false;
let equalPressed = false;
let previousDisplay = "";
let currentEquation = "";

function updateDisplay() {
  const currentScreenElement = document.querySelector('.currentScreen');
  const pastScreenElement = document.querySelector('.pastScreen');
  currentScreenElement.textContent = currentNumber ? parseFloat(currentNumber).toLocaleString() || "0": operator;
  pastScreenElement.textContent = resultDisplayed ? previousDisplay : "";
}

function enterNumber(num) {
  if (resultDisplayed || equalPressed) {
      currentEquation = "";
      currentNumber = num.toString();
      resultDisplayed = false;
      equalPressed = false;
  } else if (currentNumber.length < 13) {
      currentNumber += num;
  }
  currentEquation += num;
  updateDisplay();
}


function enterFloat() {
  if (hasDecimal) return;
  currentNumber += '.';
  currentEquation += '.';
  hasDecimal = true;
  updateDisplay();
}

function enterOperator(newOperator) {
  if (hasDecimal) {
      currentNumber = parseFloat(currentNumber).toString();
      hasDecimal = false;
  }
  prevpreviousNumber = currentNumber;
  currentNumber = "";
  operator = newOperator;
  currentEquation += ' ' + newOperator + ' ';
  updateDisplay();
}

function operate(inputNumber) {
    let result;
    switch (operator) {
        case "+":
            result = add(inputNumber);
            break;
        case "-":
            result = subtract(inputNumber);
            break;
        case "*":
            result = multiply(inputNumber);
            break;
        case "/":
            result = divide(inputNumber);
            break;
    }
    return isInteger(result) ? parseInt(result) : parseFloat(result).toFixed(4);
}

function isInteger(number) {
  return parseFloat(number) === parseInt(number);
}

function equals() {
  previousNumber = currentNumber;
  currentNumber = operate(previousNumber);

  previousDisplay = currentEquation + ' = ' + formatNumber(currentNumber);

  currentEquation = "";
  resultDisplayed = true;
  equalPressed = true;
  updateDisplay();
  resetStateAfterOperation();
}

function formatNumber(number) {
  if (isInteger(number)) {
      return parseInt(number);
  } else {
      return parseFloat(parseFloat(number).toFixed(4)).toString();
  }
}


function resetStateAfterOperation() {
  prevpreviousNumber = null;
  operator = null;
  hasDecimal = false;
  equalPressed = false;
}

function clearScreens() {
  prevpreviousNumber = null;
  currentNumber = "0";
  previousDisplay = "";
  currentEquation = "";
  resetStateAfterOperation();
  updateDisplay();
}

function backSpace() {
  if (currentNumber.length === 1) {
      currentNumber = "0";
  } else {
      currentNumber = currentNumber.slice(0, -1);
  }
  currentEquation = currentEquation.slice(0, -1);
  updateDisplay();
}

function add(newNum) {
    return parseFloat(prevpreviousNumber) + parseFloat(newNum);
}

function subtract(newNum) {
    return parseFloat(prevpreviousNumber) - parseFloat(newNum);
}

function multiply(newNum) {
    return parseFloat(prevpreviousNumber) * parseFloat(newNum);
}

function divide(newNum) {
    if (parseFloat(newNum) === 0) return null;
    return parseFloat(prevpreviousNumber) / parseFloat(newNum);
}

function inputKey(buttonId) {
    const buttonClicked = document.getElementById(buttonId);
    const buttonValue = buttonClicked.innerHTML;

    if (isNaN(Number(buttonValue))) {
        switch (buttonId) {
            case "equals": equals(); break;
            case "clear": clearScreens(); break;
            case "backspace": backSpace(); break;
            case "dot": enterFloat(); break;
            default: enterOperator(buttonValue); break;
        }
    } else {
        enterNumber(buttonValue);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
});

const allButtons = document.querySelectorAll(".buttons button");
allButtons.forEach(button => {
    button.addEventListener('click', () => inputKey(button.id));
});
