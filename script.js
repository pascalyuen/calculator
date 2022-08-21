// Variables
const numbers = document.querySelectorAll('.number');
const displayText = document.querySelector('.display-text');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
let nextNumber = false;
let lastValue = 0;
let nextValue = 0;
const arrayOfOperators = [];
let counter = 0;
let firstOperator = true;


// Actions
numbers.forEach(number => number.addEventListener('click', numberClicked));
operators.forEach(operator => operator.addEventListener('click', operatorClicked));
equal.addEventListener('click', equalClicked);
clear.addEventListener('click', clearClicked);


// Functions
function add(a, b) {
    return a + b;
}


function substract(a, b) {
    return a - b;
}


function multiply(a, b) {
    return a * b;
}


function divide(a, b) {
    return a / b;
}


function operate(operator, a, b) {
    if (operator === '+') return add(a, b);
    if (operator === '-') return substract(a, b);
    if (operator === '*') return multiply(a, b);
    if (operator === '/') return divide(a, b);
}


function numberClicked(e) {
    // If nextNumber is true, one of the operators has been clicked and the next number should be recorded. Else, record the first number
    if (nextNumber) {
        if (nextValue <= 9999999999) {
            nextValue += e.target.textContent;
            nextValue = parseInt(nextValue);
        }
        displayText.textContent = nextValue;
    } else {
        if (lastValue <= 9999999999) {
            lastValue += e.target.textContent;
            lastValue = parseInt(lastValue);
        }
        displayText.textContent = lastValue;
    }
    // console.log(`lastValue = ${lastValue}`);
    // console.log(`nextValue = ${nextValue}`);
}


function operatorClicked(e) {
    nextNumber = true;
    arrayOfOperators.push(e.target.textContent);

    if (firstOperator) {
        lastOperator = e.target.textContent;
        firstOperator = false;
    } else {
        lastValue = operate(arrayOfOperators[counter - 1], lastValue, nextValue);
        displayText.textContent = lastValue;
        nextValue = 0;
    }

    counter += 1;
    // console.log(`lastValue = ${lastValue}`);
    // console.log(`nextValue = ${nextValue}`);
}


function equalClicked(e) {
    displayText.textContent = operate(arrayOfOperators[counter - 1], lastValue, nextValue);
}


function clearClicked(e) {
    nextNumber = false;
    lastValue = 0;
    nextValue = 0;
    arrayOfOperators.length = 0;
    counter = 0;
    firstOperator = true;
    displayText.textContent = '0';
}