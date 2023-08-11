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
    currentScreenElement.textContent = (parseFloat(currentNumber)<10**9 ? parseFloat(currentNumber).toLocaleString(): parseFloat(currentNumber).toExponential(3)); // Fixed the conversion issue
    pastScreenElement.textContent = previousDisplay;
    // fixing font size 
    if (toString(previousDisplay).length>15){
        pastScreenElement.style.fontSize = "20px";

    }
}

function enterNumber(num) {
    if(equalPressed){
        clearScreens(num);
    }
    else if ( (currentNumber === "0" && num !== "0") || resultDisplayed) { // write over the value
        currentNumber = num;
        resultDisplayed = false;
        console.log("hey");
    }else if(currentNumber === "0" && num !== "0") {
      currentNumber = num;
    }
    else if(operator !== null){
        currentNumber += num;
        previousNumber = currentNumber;
    }
    else{
        currentNumber += num;
    }
    previousNumber = currentNumber;
    previousDisplay = (prevpreviousNumber && previousNumber ? prevpreviousNumber : "") + (operator ? operator : "");
    updateDisplay(previousDisplay);
}

function enterFloat() {
    if (hasDecimal) return;
    currentNumber += '.';
    hasDecimal = true;
    updateDisplay();
}

let operatorCount = 0;   // variable to track if we are using the mode without equal button
function enterOperator(newOperator) {
    equalPressed=false;
    if (hasDecimal) {
        currentNumber = parseFloat(currentNumber);
        hasDecimal = false;
    }
  // the introduction of the first operator : no calculations are done
    if (newOperator !== null && operatorCount===0 ) {
        prevpreviousNumber = currentNumber;
        currentNumber = "0";
        operatorCount++;
        console.log(prevpreviousNumber);
        operator = newOperator;
        previousDisplay = (prevpreviousNumber ? prevpreviousNumber : "") + (operator ? operator : "");
        updateDisplay(previousDisplay);
    }
// the introduction of the second - n operator : calculations are done without clicking equal button
    else if (operatorCount>1) {
        previousNumber = currentNumber;
        currentNumber = "0";
        operatorCount++;
        console.log(prevpreviousNumber);
        operator = newOperator;
        console.log(previousNumber);
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
    console.log(operatorCount)
    // case: where only the first side and the operator are mentioned
    if(previousNumber === null){
        previousNumber = prevpreviousNumber;
        currentNumber = operate(previousNumber); 
        operatorCount = 0;   // operator click counter reset
        resultDisplayed = true;
        equalPressed = true;
        previousDisplay = (prevpreviousNumber? prevpreviousNumber : "") + (operator? operator : "") +  previousNumber + "=";
        updateDisplay(previousDisplay);
    }
    // for calculations without using equal button
    else if(operatorCount>1){  
        console.log(prevpreviousNumber,previousNumber);   
        prevpreviousNumber = operate(previousNumber);
        resultDisplayed = true;
        equalPressed = true;
        previousDisplay = (currentNumber? currentNumber : "") + (operator? operator : "") ;
        updateDisplay(previousDisplay);
    }
    // for default behaviour of equal sign
    else {
      if(equalPressed){
        prevpreviousNumber = currentNumber;
      }
      operatorCount = 0;  // operator click counter reset
      console.log(currentNumber)
      console.log(prevpreviousNumber,previousNumber);
      currentNumber = operate(previousNumber);
      resultDisplayed = true;
      equalPressed = true;
      previousDisplay = (prevpreviousNumber ? prevpreviousNumber : "") + (operator ? operator : "") +  previousNumber + "=";
      updateDisplay(previousDisplay);
    }
      
    
}

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
});

function clearScreens(num) {
    previousDisplay = ""; 
    previousNumber = null;
    prevpreviousNumber = null;
    num ? currentNumber = num:currentNumber = "0";
    operator = null; // Reset the operator
    hasDecimal = false;
    resultDisplayed = false;
    equalPressed = false;
    updateDisplay(previousDisplay);
}

function backSpace() {
    if(equalPressed){
        clearScreens();
    }else if (currentNumber.length === 1) {
        currentNumber = "0";
    } 
    else {
        let currentList = currentNumber.split("");
        currentList.pop(); // Removed unnecessary arguments
        currentNumber = currentList.join("");
    }
    previousDisplay = (prevpreviousNumber ? prevpreviousNumber : "") + (operator ? operator : "")

    updateDisplay(previousDisplay);
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