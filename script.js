let num1 = "";
let operator = "";
let num2 = "";
let display = document.querySelector(".display");
let showingHello = true;

document.querySelectorAll("button").forEach(button => 
    button.addEventListener("click", clearInitial));

document.querySelector(".clear").addEventListener("click", removeFromDisplay);

document.querySelectorAll(".number, .operator").forEach(updateButton => 
    updateButton.addEventListener("click", updateDisplay));

document.querySelector(".equals").addEventListener("click", evaluateDisplay);



function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, operator, num2) {
    num1 = +num1;
    num2 = +num2;
    if (operator == "+") return add(num1, num2);
    if (operator == "-") return subtract(num1, num2);
    if (operator == "*") return multiply(num1, num2);
    if (operator == "/") return divide(num1, num2);
}


function removeFromDisplay(e) {
        display.textContent = "";
        num1 = "";
        num2 = "";
        operator = "";

}

function clearInitial() {
    if (showingHello == true) {
    display.textContent = "";
    showingHello = false;
    }
}

function updateDisplay(e) {
    display.textContent += e.target.textContent;
}

function evaluateDisplay() {
    let recordingSecond = false;
    // Loop over the user input
    for (i = 0; i < display.textContent.length; i++) {
        if (checkNum(display.textContent[i]) && recordingSecond == false) {
            num1 += display.textContent[i];
        }
    
    }
    num3 = operate(num1, "+", 2);
    console.log(num1);
    console.log(num3);
    display.textContent = num3;

    num1 = "";
    operator = "";
    num2 = "";
}

    function checkNum(char) {
        // If a number or decimal, return true
        if (char >= 0 || char == ".") {
            return true;
        } // else is operator, return false
        else return false;
    }