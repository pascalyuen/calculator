// Numbers
// const zero = document.querySelector(.0);
// const one = document.querySelector(.1);
// const two = document.querySelector(.2);
// const three = document.querySelector(.3);
// const four = document.querySelector(.4);
// const five = document.querySelector(.5);
// const six = document.querySelector(.6);
// const seven = document.querySelector(.7);
// const eight = document.querySelector(.8);
// const nine = document.querySelector(.9);
const numbers = document.querySelectorAll('.number');
const displayText = document.querySelector('.display-text');


// Actions
numbers.forEach(number => number.addEventListener('click', showNumber));


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

function showNumber(e) {
    displayText.textContent = e.target.textContent;
}