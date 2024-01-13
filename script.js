let firstNumber;
let secondNumber;
let operator = "+";
let result = "";

function operate(operator, a, b) {
    a = parseInt(a);
    b = parseInt(b);
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return "error";
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// display

function pressNumberButton(target) {
    switch (target.id) {
        case 'button0':
            return 0;
        case 'button1':
            return 1;
        case 'button2':
            return 2;
        case 'button3':
            return 3;
        case 'button4':
            return 4;
        case 'button5':
            return 5;
        case 'button6':
            return 6;
        case 'button7':
            return 7;
        case 'button8':
            return 8;
        case 'button9':
            return 9;
        default: return "";
    }
}

function pressOperatorButton(target) {
    switch (target.id) {
        case 'button+':
            return "+";
        case 'button-':
            return "-";
        case 'button*':
            return "*";
        case 'button/':
            return "/";
    }
}

function evaluate() {
    secondNumber = display;
    result = operate(operator, firstNumber, secondNumber);
    firstNumber = result;
    calculatorDisplay.innerHTML = firstNumber;
    secondNumber = "";
    operator = "";
}

let display = "";
let tempResult;
let calculatorField = document.querySelector(".calculator");
let calculatorDisplay = document.querySelector("#display");

calculatorField.addEventListener('click', (event) => {
    let target = event.target;
    switch (target.className) {
        case "numberButton": {
            if (result) {
                display = "";
                calculatorDisplay.innerHTML = display;
                result = "";
            }
            buttonPressed = pressNumberButton(target);
            display += buttonPressed;
            calculatorDisplay.innerHTML = display;
            break;
        }
        case "operateButton": {
            operator = pressOperatorButton(target);
            calculatorDisplay.innerHTML = "";
            if (!firstNumber && display) {
                firstNumber = display;
                display = "";
            } else if (result) {
                display = "";   
            } else if (firstNumber && operator && display) {
                evaluate();
                operator = pressOperatorButton(target);
            } else if (firstNumber) {
                display = "";
                calculatorDisplay.innerHTML = display;
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
        tempResult = "";
        calculatorDisplay.innerHTML = display;
        break;
    }
}
    console.log(`firstNumber: ${firstNumber}, secondNumber: ${secondNumber}, result: ${result}, operator: ${operator}`);
})

// if operateButton is pressed, and firstNumber and secondNumber have already been given, operate
// firstNumber and secondNumber first, and display the answer.

// if numberButton is pressed, after a calculation, clear display and start new calculation.
// if operateButton is pressed after a calculation, take result as firstNumber, take the operator, and prompt for secondNumber.

// display += buttonPressed works correctly when display is a string, but not when display is an int.


