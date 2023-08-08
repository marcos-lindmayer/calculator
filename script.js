let previousNumber = "3+3";
let currentNumber = "3777";
let operator = null;
let hasDecimal = false;
let resultDisplayed = false;

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
  
  function clearScreens(){
        previousNumber = "0";
        currentNumber = "0";
        updateDisplay();
  }

  function backSpace(){
    if(resultDisplayed){
      clearScreens();
    }
    else{
      let currentList = currentNumber.split("");

      currentList.pop(currentList.length-1,1);
      currentNumber  = currentList.join("");
    }
    updateDisplay();
  }


  // EventListeners 

  const num0 = document.getElementById("zero").addEventListener('click',() => enterNumber(0));
  const num1 = document.getElementById("one").addEventListener('click',() => enterNumber(1));
  const num2 = document.getElementById("two").addEventListener('click',() => enterNumber(2));
  const num3 = document.getElementById("three").addEventListener('click',() => enterNumber(3));
  const num4 = document.getElementById("four").addEventListener('click',() => enterNumber(4));
  const num5 = document.getElementById("five").addEventListener('click',() => enterNumber(5));
  const num6 = document.getElementById("six").addEventListener('click',() => enterNumber(6));
  const num7 = document.getElementById("seven").addEventListener('click',() => enterNumber(7));
  const num8 = document.getElementById("eight").addEventListener('click',() => enterNumber(8));
  const num9 = document.getElementById("nine").addEventListener('click',() => enterNumber(9));

  const equal = document.getElementById("equals").addEventListener('click',() =>equal());
  
  const clear = document.getElementById("clear").addEventListener('click',() =>clearScreens());

  const backspace = document.getElementById("backspace").addEventListener('click',() => backSpace());