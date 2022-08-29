// Buttons selector
let numButtons = document.querySelectorAll(".grid-layout #num");
let operatorButtons = document.querySelectorAll(".grid-layout #operator");
let divideBtn = document.querySelector(".divide");
let mulBtn = document.querySelector(".multiply")
let decimalBtn = document.querySelector(".decimal");
let minusBtn = document.querySelector(".minus");
let plusBtn = document.querySelector(".plus");
let equalBtn = document.querySelector(".evaluate");
let clearBtn = document.querySelector(".clear");
let deleteBtn = document.querySelector(".delete");

// Turn on initial numpad
let initialNumpad = true;

// Display selector
let currentDisplay = document.querySelector(".current-display");
let bgDisplay = document.querySelector(".background-display");
let resultBgDisplay = "";
// Initialize num1 and num2
initializeAll();

// Initialize pastOperator
let pastOperator = function (x, y){
    return x;
};

// num1 numpad is active
num1Input();

divideBtn.addEventListener("click", () => {
    process(divide,"/");
});
plusBtn.addEventListener("click", () => {
    process(add,"+");
});
minusBtn.addEventListener("click", () => {
    process(subtract, "-");
});
mulBtn.addEventListener("click", () => {
    process(multiply, "x");
});

equalBtn.addEventListener("click", (e) => {
    let result = operate(pastOperator, num1, num2);
    
    // If result have decimal places, fix it to 5 dp
    if (result % 1 != 0) result = result.toFixed(5);
    
    // Display section
    console.log(`result: ${result}`);
    bgDisplay.textContent = `${resultBgDisplay} ${num2} =`;
    currentDisplay.textContent = result;

    // Set num2 and num2String to result for delete feature after equal
    num2String = result.toString();
    num2 = result;
    pastOperator = equal;
})

clearBtn.addEventListener("click", (e) => {
    initializeAll();
})

deleteBtn.addEventListener("click", () => {
    console.log("delete");
    if(initialNumpad){
        // If num1 numpad is active, slice num1String
        num1String = num1String.slice(0, -1);
        num1 = parseFloat(num1String);
        currentDisplay.textContent = num1String;
    }
    else {
        // If num2 numpad is active, slice num2String
        num2String = num2String.slice(0, -1);
        num2 = parseFloat(num2String);
        console.log(`num2: ${num2}`)
        currentDisplay.textContent = num2String;
    }
})

decimalBtn.addEventListener("click", decimal);

function num1Input(){
    for (numBtn of numButtons) {
        numBtn.addEventListener("click", (e) => {
            // If num1 numpad is active and string does not exceed limit
            if (initialNumpad && (num1String.length <= 15)){
                // Append number chosen to num1String
                num1String += e.target.textContent;
                console.log(`num1string: ${num1String}`);
                num1 = parseFloat(num1String);    
                currentDisplay.textContent = num1String;
            }
        })
    }
}

function num2Input(){
    for (numBtn of numButtons) {
        numBtn.addEventListener("click", getNum2)
    }
}
function getNum2(e) {
    // If num1 numpad is off
    if ((!initialNumpad) && (num2String.length <= 15)){
        num2String += e.target.textContent;
        num2 = parseFloat(num2String);
        currentDisplay.textContent = num2String;

        console.log(`num2string:${num2String}`);
        console.log(`num2:${num2}`);
    }
}


function process(operator,sign) {
    // If num1 numpad is on
    if(initialNumpad){
        // Turn off num1 numpad if operator is pressed
        initialNumpad = false;
        // Store operator chosen to be used when another operator is clicked
        pastOperator = operator;
        console.log(operator);
        
        bgDisplay.textContent = `${num1} ${sign}`;
        currentDisplay.textContent = `${num1} ${sign}`;
        resultBgDisplay = num1String + " " +sign;
        // Turn on num2 numpad
        num2Input();
    }
    // If num2 numpad is on
    else{
        // If operation button was clicked more 2 times in a row, exit function
        if (num2String === "") return;
        console.log(operator);
        console.log(`num1: ${num1}`);
        console.log(`num2: ${num2}`);
        
        // Store answer in num1
        num1 = operate(pastOperator, num1, num2);
        bgDisplay.textContent = `${num1} ${sign}`;
        resultBgDisplay = `${num1} ${sign}`;
        pastOperator = operator;
        
        console.log(`num1: ${num1}`);
        // Initialize num2 and num2String
        num2String = "";
        num2 = 0;
        currentDisplay.textContent = num2;
    }
}

function add(x, y) {
    return x  + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}
function divide(x, y) {
    return x / y;
}

function operate(func, x, y) {
    return func(x,y);
}

// Just return num2(editable with deleteBtn) if equal was last pressed
function equal(x, y){
    return y;
}

function decimal(){
    // If the string already contains a decimal, exit function
    if (currentDisplay.textContent.includes(".")) return;
    if (initialNumpad) {
        num1String += ".";
        currentDisplay.textContent = num1String;
    }
    else {
        num2String += ".";
        currentDisplay.textContent = num2String;
    }
}

function initializeAll() {
    num1String = "";
    num1 = 0;
    num2String = "";
    num2 = 0;
    currentDisplay.textContent = num1;
    bgDisplay.textContent = 0;
    initialNumpad = true;
    console.log("AC");
}
