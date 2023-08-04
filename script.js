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
        } else if (!checkNum(display.textContent[i])) {
            operator = display.textContent[i];
            recordingSecond = true;
        } else if (checkNum(display.textContent[i]) && recordingSecond == true) {
            num2 += display.textContent[i];
        }
    
    }

    // If the user did not input all of the required parameters, 
    // or is trying to divide by zero, display an error
    if (operator === "" || num2 === "" || (operator === "/" && num2 == "0")) {
        display.textContent = "ERROR!";
        showingHello = true;
        num1 = "";
        num2 = "";
        num3 = "";
        return;
    }

    let num3 = operate(num1, operator, num2);

    // Round decimals to 5 places if the output has a decimal longer than that
    num3 = checkDecimal(num3);
    display.textContent = num3;
    console.log(num1);
    console.log(num3);

    num1 = "";
    operator = "";
    num2 = "";
}

function checkNum(char) {
    // If a number or decimal point, return true
    if (char >= 0 || char == ".") {
        return true;
    } // else is operator, return false
    else return false;
}

function checkDecimal(num) {
    index = num.toString().indexOf(".");
    if (index == -1) return num;
    else {
        decimalPart = num.toString().substring(index + 1);
        if (decimalPart.length > 8) {
            return num.toFixed(8)
        } else return num;

    }
}