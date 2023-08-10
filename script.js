let previousNumber = null;
let prevpreviousNumber = null;
let previousDisplay= "";
let currentNumber = "0";
let operator = null;
let hasDecimal = false;
let resultDisplayed = false;
let equalPressed = false;

function updateDisplay(previousDisplay) {
    const currentScreenElement = document.querySelector('.currentScreen');
    const pastScreenElement = document.querySelector('.pastScreen');
    currentScreenElement.textContent = (currentNumber ? parseFloat(currentNumber).toLocaleString(): "0"); // Fixed the conversion issue
    pastScreenElement.textContent = previousDisplay;
}

function enterNumber(num) {
    if (( (currentNumber === "0" && num !== "0") && operator === null) || resultDisplayed || equalPressed) { // write over the value
        currentNumber = num;
        resultDisplayed = false;
        console.log("hey");
    }else if((currentNumber === "0" && num !== "0") && operator !== null){
      currentNumber = num;
    }
    else if (currentNumber.length < 13) {
        currentNumber += num;

    }
    previousDisplay = (prevpreviousNumber ? prevpreviousNumber : "") + (operator ? operator : "");
    updateDisplay(previousDisplay);
}

function enterFloat() {
    if (hasDecimal) return;
    currentNumber += '.';
    hasDecimal = true;
    updateDisplay();
}
let operatorCount = 0;
function enterOperator(newOperator) {
  
  if (hasDecimal) {
      currentNumber = parseFloat(currentNumber);
      hasDecimal = false;
  }
  if (newOperator !== null && operatorCount===0 ) {
      // An operator and a previous number exist, perform the operation before switching the operator
      prevpreviousNumber = currentNumber;
      currentNumber = "";
      operatorCount++;
      console.log(prevpreviousNumber);
      operator = newOperator;
      previousDisplay = (prevpreviousNumber ? prevpreviousNumber : "") + (operator ? operator : "");
      updateDisplay(previousDisplay);
  
} if (operatorCount>1) {
    operatorCount++;
    previousNumber = currentNumber;
    currentNumber = "";
    operatorCount++;
    console.log(prevpreviousNumber);
    operator = newOperator;
    console.log(currentNumber);
    equals();
}
}

function add(newNum) {
    return parseFloat(prevpreviousNumber) + parseFloat(newNum); // Fixed the conversion issue
}

function subtract(newNum) {
    return parseFloat(prevpreviousNumber) - parseFloat(newNum); // Fixed the conversion issue
}

function multiply(newNum) {
    return parseFloat(prevpreviousNumber) * parseFloat(newNum); // Fixed the conversion issue
}

function divide(newNum) {
    if (parseFloat(newNum) === 0) return null; // Fixed the conversion issue and division by zero check
    return parseFloat(prevpreviousNumber) / parseFloat(newNum); // Fixed the conversion issue
}

function operate(inputNumber) {
    switch (operator) {
        case "+":
            currentNumber = add(inputNumber);
            break;
        case "-":
            currentNumber = subtract(inputNumber);
            break;
        case "*":
            currentNumber = multiply(inputNumber);
            break;
        case "/":
            if (parseFloat(inputNumber) === 0) return null;
            updateDisplay();
            currentNumber = divide(inputNumber);
            break;
    }
    currentNumber = Math.round(currentNumber * 10000) / 10000; // Limiting to 4 decimal points
    return currentNumber;
}

function equals() {
    console.log(operatorCount);
    if(previousNumber === null){
      previousNumber = currentNumber;
      currentNumber = operate(previousNumber); 
      
      resultDisplayed = true;
      equalPressed = true;
      previousDisplay = (prevpreviousNumber? prevpreviousNumber : "") + (operator? operator : "") +  previousNumber + "=";
      updateDisplay(previousDisplay);
    }
    else if(operatorCount>1){     // for calculations without using equal button
      console.log(prevpreviousNumber,previousNumber);
      prevpreviousNumber = currentNumber;
      currentNumber = operate(previousNumber);
      resultDisplayed = true;
      equalPressed = true;
      previousDisplay = (currentNumber? currentNumber : "") + (operator? operator : "") ;
      updateDisplay(previousDisplay);
    }
    else{
      console.log(prevpreviousNumber,previousNumber);
      prevpreviousNumber = currentNumber; 
      currentNumber = operate(previousNumber);
      resultDisplayed = true;
      equalPressed = true;
      previousDisplay = (prevpreviousNumber ? prevpreviousNumber : "") + (operator ? operator : "") +  previousNumber + "=";
      updateDisplay(previousDisplay);
    }
    operatorCount = 0;  // operator click counter reset

}

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
});

function clearScreens() {
    previousDisplay = ""; 
    previousNumber = null;
    prevpreviousNumber = null;
    currentNumber = "0";
    operator = null; // Reset the operator
    hasDecimal = false;
    resultDisplayed = false;
    updateDisplay(previousDisplay);
}

function backSpace() {
    if (currentNumber.length === 1) {
        currentNumber = "0";
    } else {
        let currentList = currentNumber.split("");
        currentList.pop(); // Removed unnecessary arguments
        currentNumber = currentList.join("");
    }
    updateDisplay();
}

function inputKey(buttonId) {
    const buttonClicked = document.getElementById(buttonId);
    const buttonValue = buttonClicked.innerHTML;
    if (isNaN(Number(buttonValue))) {
        switch (buttonId) {
            case "equals":
                equals();
                break;
            case "clear":
                clearScreens();
                break; 
            case "backspace":
                backSpace();
                break; 
            case "dot":
                enterFloat();
                break; 
            default:
                enterOperator(buttonValue);
                break;
        }
    } else {
        enterNumber(buttonValue);
    }
}



// EventListeners

const allButtons = document.querySelectorAll(".buttons button");
allButtons.forEach(button => {
    button.addEventListener('click', () => inputKey(button.id)); // Removed unnecessary event variable
});