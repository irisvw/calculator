let firstNumber;
let secondNumber;
let operator = "";
let result = "";
let display = "";
let displayResult = "";
let calculatorField = document.querySelector(".calculator");
let calculatorDisplay = document.querySelector("#display");

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return "error";
    }
}

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return a / b; }

function pressNumberButton(target) {
    switch (target.id) {
        case 'button0': return 0;
        case 'button1': return 1;
        case 'button2': return 2;
        case 'button3': return 3;
        case 'button4': return 4;
        case 'button5': return 5;
        case 'button6': return 6;
        case 'button7': return 7;
        case 'button8': return 8;
        case 'button9': return 9;
        default: return "";
    }
}

function pressOperatorButton(target) {
    switch (target.id) {
        case 'button+': return "+";
        case 'button-': return "-";
        case 'button*': return "*";
        case 'button/': return "/";
    }
}

function evaluate() {
    secondNumber = display;
    if (secondNumber === "0" && operator === "/") {
        result = "";
        displayResult = "😂";
        display = "";
        firstNumber = "";
    } else {
        result = operate(operator, firstNumber, secondNumber);
        displayResult = Math.round(result * 100000) / 100000;
        if (isNaN(result)) {
            calculatorDisplay.innerHTML = "error"
            display = "";
            firstNumber = "";
            secondNumber = "";
            operator = "";
            return;
        } else if (displayResult > 9999999999) {
            displayResult = displayResult.toExponential(5);
        }
        firstNumber = result;
    }
    calculatorDisplay.innerHTML = displayResult;
    displayResult = "";
    display = "";
    secondNumber = "";
    operator = "";
}

calculatorField.addEventListener('click', (event) => {
    let target = event.target;
    switch (target.className) {
        case "numberButton": {
            if (result) {
                display = "";
                calculatorDisplay.innerHTML = display;
                result = "";
            }
            if (display.length <= 10) {
                buttonPressed = pressNumberButton(target);
                display += buttonPressed;
                calculatorDisplay.innerHTML = display;
            }
            break;
        }

        case "operateButton": {
            calculatorDisplay.innerHTML = "";
            if (!firstNumber && display) {
                firstNumber = display;
                display = "";
                operator = pressOperatorButton(target);
            } else if (typeof result === "number") {
                display = "";
                operator = pressOperatorButton(target);
            } else if (firstNumber && operator && display) {
                evaluate();
                operator = pressOperatorButton(target);
            } else if (typeof firstNumber === "number") {
                display = "";
                calculatorDisplay.innerHTML = display;
                operator = pressOperatorButton(target);
            }
            break;
        }

        case "evaluateButton": {
            if (firstNumber && operator) {
                evaluate();
            }
            break;
        }

        case "clearButton": {
            firstNumber = "";
            secondNumber = "";
            operator = "";
            display = "";
            result = "";
            calculatorDisplay.innerHTML = display;
            break;
        }
    }
    // console.log(`firstNumber: ${firstNumber}, secondNumber: ${secondNumber}, result: ${result}, displayResult: ${displayResult}, operator: ${operator}`);
})