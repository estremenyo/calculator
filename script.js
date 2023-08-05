let num1 = "";
let operator = "";
let num2 = "";
let display = document.querySelector(".display");
let needToClearScreen = true;
let decimalExists = false;

document.querySelectorAll("button").forEach(button => 
    button.addEventListener("click", clearInitial));

document.querySelector(".clear").addEventListener("click", removeFromDisplay);

document.querySelectorAll(".number, .operator").forEach(updateButton => 
    updateButton.addEventListener("click", updateDisplay));

document.querySelector(".equals").addEventListener("click", evaluateDisplay);

document.querySelector(".backspace").addEventListener("click", deleteFromDisplay);



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


function removeFromDisplay() {
    display.textContent = "";
    num1 = "";
    num2 = "";
    operator = "";
    decimalExists = false;
}

function deleteFromDisplay() {
    display.textContent = display.textContent.slice(0, -1);
}

function clearInitial() {
    if (needToClearScreen == true) {
    display.textContent = "";
    needToClearScreen = false;
    num1 = "";
    num2 = "";
    operator = "";
    decimalExists = false;
    }
}

function updateDisplay(e) {
    if (e.target.textContent != ".") {
        display.textContent += e.target.textContent;
    } else if (e.target.textContent == "." && decimalExists == false) {
        display.textContent += e.target.textContent;
        decimalExists = true;
    }
}

function evaluateDisplay() {
    let recordingSecond = false;
    for (let i = 0; i < display.textContent.length; i++) {
        if (isNum(display.textContent[i]) && recordingSecond == false) {
            num1 += display.textContent[i];
        } else if (!isNum(display.textContent[i]) && recordingSecond == false) {
            operator = display.textContent[i];
            recordingSecond = true;
        } else if (isNum(display.textContent[i]) && recordingSecond == true) {
            num2 += display.textContent[i];
        }
        else if (!isNum(display.textContent[i]) && recordingSecond == true) {
            if (operator == "/" && num2 == "0") {
                display.textContent = "ERROR";
                needToClearScreen = true;
                return;
            }
            num1 = operate(num1, operator, num2);
            num2 = "";
            operator = display.textContent[i];
        } 
    }

    if (operator == "/" && num2 == "0") {
        display.textContent = "ERROR";
        needToClearScreen = true;
        return;
    } else {
        num1 = operate(num1, operator, num2);
        num1 = checkDecimal(num1, 5);
        display.textContent = num1;
        needToClearScreen = true;
    }
}


function isNum(char) {
    if (char >= 0 || char == ".") return true;
    else return false;
}

function checkDecimal(num, n) {
    index = num.toString().indexOf(".");
    if (index == -1) return num;
    else {
        decimalPart = num.toString().substring(index + 1);
        if (decimalPart.length > n) {
            return num.toFixed(n)
        } else return num;
    }
}