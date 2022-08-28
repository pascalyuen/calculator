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
let answer = 0;
let keyPress = false;


// Actions
numbers.forEach(number => number.addEventListener('click', numberClicked));
operators.forEach(operator => operator.addEventListener('click', operatorClicked));
equal.addEventListener('click', equalClicked);
clear.addEventListener('click', clearClicked);
document.addEventListener('keydown', onKeyDown);


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
        if (nextValue <= 999999999) {
            if (keyPress) {
                nextValue += e;
                keyPress = false;
            } else {
                nextValue += e.target.textContent;
            }
            nextValue = parseFloat(nextValue);
        }
        displayText.textContent = nextValue;
    } else {
        if (lastValue <= 999999999) {
            if (keyPress) {
                lastValue += e;
                keyPress = false;
            } else {
                lastValue += e.target.textContent;
            }
            lastValue = parseFloat(lastValue);
        }
        displayText.textContent = lastValue;
    }
    // console.log(`lastValue = ${lastValue}`);
    // console.log(`nextValue = ${nextValue}`);
}


function operatorClicked(e) {
    nextNumber = true;
    if (keyPress) {
        arrayOfOperators.push(e);
    } else {
        arrayOfOperators.push(e.target.textContent);
    }    

    if (firstOperator) {
        if (keyPress) {
            lastOperator = e;
            keyPress = false;
        } else {
            lastOperator = e.target.textContent;
        }
        firstOperator = false;
    } else {
        lastValue = operate(arrayOfOperators[counter - 1], lastValue, nextValue);
        if (arrayOfOperators[counter - 1] === '/' && nextValue === 0) {
            alert('You can\'t divide by 0');
            clearClicked;
        }
        if (lastValue >= 999999999) {
            lastValue = lastValue.toExponential(2);
        }
            displayText.textContent = Math.round(lastValue * 10000000) / 10000000;
        
        nextValue = 0;
    }

    counter += 1;
    // console.log(`lastValue = ${lastValue}`);
    // console.log(`nextValue = ${nextValue}`);
}


function equalClicked(e) {
    answer = operate(arrayOfOperators[counter - 1], lastValue, nextValue);
    if (arrayOfOperators.length === 0) {
        return lastValue;
    }
    // Case: dividing by zero
    if (arrayOfOperators[counter - 1] === '/' && nextValue === 0) {
        alert('You can\'t divide by 0');
        clearClicked;
    } else {
        displayText.textContent = Math.round(answer * 10000000) / 10000000;
    }
    if (answer >= 999999999) {
        answer = answer.toExponential(2);
    }
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


function onKeyDown(e) {
    keyPress = true;
    if (e.key >= 0 && e.key <= 9 || e.key === '.') {
        numberClicked(e.key);
    }
    if (e.key === 'Add' || e.key === 'Subtract' || e.key === 'Multiply' || e.key === 'Divide') {
        operatorClicked(e.Enter);
    }
    if (e.key === 'Enter') {
        equalClicked(e.key);
    }
}