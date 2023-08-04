let num1 = "";
let operator = "";
let num2 = "";
let display = document.querySelector(".display");
let showingHello = true;
let decimalExists = false;

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
        decimalExists = false;

}

function clearInitial() {
    if (showingHello == true) {
    display.textContent = "";
    showingHello = false;
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
    // Loop over the user input
    for (i = 0; i < display.textContent.length; i++) {
        // Record the first number
        if (checkNum(display.textContent[i]) && recordingSecond == false) {
            num1 += display.textContent[i];
        // Record the operator
        } else if (!checkNum(display.textContent[i]) && recordingSecond == false) {
            operator = display.textContent[i];
            recordingSecond = true;
        // Record the second number
        } else if (checkNum(display.textContent[i]) && recordingSecond == true) {
            num2 += display.textContent[i];
        }
        // If we are already recording the second number but see another operator,
        // we need to operate on our current numbers before moving on to the next
        else if (!checkNum(display.textContent[i]) && recordingSecond == true) {
            // TODO
            num1 = operate(num1, operator, num2);
            num2 = "";
            operator = display.textContent[i];
        }
        // Check if the user is dividing by zero
        // TODO: If num2 is '0' w/o a fraction, run the conditional
        // But if num2 is 0 w/ a fraction e.g. '0.7', don't run it
        if (operator == "/" && num2 == "0") {
            display.textContent = "ERROR!";
            showingHello = true;
            return;
        }    
    }
    // If the user is trying to divide or multiply by nothing, set it to 1
    if ((operator == "/" || operator == "*") && (num2 == "" || num2 == ".")) {
        num2 = 1;
    }    

    // Operate on our variables the only or last time
    num1 = operate(num1, operator, num2);

    // Round decimals to 5 places if the output has a decimal longer than that
    num1 = checkDecimal(num1);
    display.textContent = num1;
    showingHello = true;
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
        if (decimalPart.length > 5) {
            return num.toFixed(5)
        } else return num;

    }
}