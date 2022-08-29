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

for (numBtn of numButtons) {
    numBtn.addEventListener("click", (e) => {
        if (initialNumpad){
            num1String += e.target.textContent;
            console.log(`num1string: ${num1String}`);
            num1 = parseFloat(num1String);    
            currentDisplay.textContent = num1String;
        }
    })
}


function numpad(){
    for (numBtn of numButtons) {
        numBtn.addEventListener("click", getNum2)
    }
}
function getNum2(e) {
    if (!initialNumpad){
        num2String += e.target.textContent;
        num2 = parseFloat(num2String);
        currentDisplay.textContent = num2String;

        console.log(`num2string:${num2String}`);
        console.log(`num2:${num2}`);
    }
}

divideBtn.addEventListener("click", (e) => {
    process(divide,"/");
});
plusBtn.addEventListener("click", (e) => {
    process(add,"+");
});
minusBtn.addEventListener("click", (e) => {
    process(subtract, "-");
});
mulBtn.addEventListener("click", (e) => {
    process(multiply, "x");
});

equalBtn.addEventListener("click", (e) => {
    let result = operate(pastOperator, num1, num2);
    if (result % 1 != 0) result = result.toFixed(5);
    console.log(`result: ${result}`);
    bgDisplay.textContent = resultBgDisplay + num2;
    currentDisplay.textContent = result;
})

clearBtn.addEventListener("click", (e) => {
    initializeAll();
})

deleteBtn.addEventListener("click", () => {
    console.log("delete");
    if(initialNumpad){
        num1String = num1String.slice(0, -1);
        num1 = parseFloat(num1String);
        currentDisplay.textContent = num1String;
    }
    else {
        num2String = num2String.slice(0, -1);
        num2 = parseFloat(num2String);
        currentDisplay.textContent = num2String;
    }
})

decimalBtn.addEventListener("click", () => {
    if (initialNumpad) {
        num1String += ".";
        currentDisplay.textContent = num1String;
    }
    else {
        num2String += ".";
        currentDisplay.textContent = num2String;
    }
})
function add(x, y) {
    return x  + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}
let divide = function (x, y) {
    return x / y;
}


function operate(func, x, y) {
    return func(x,y);
}

function process(operator,sign) {
    if(initialNumpad){
        initialNumpad = false;
        pastOperator = operator;

        console.log(operator);

        bgDisplay.textContent = num1String + sign;
        currentDisplay.textContent = num1String + sign;
        resultBgDisplay = num1String + sign;
        numpad(num2String);
    }
    else{
        console.log(operator);
        console.log(`num1: ${num1}`);
        console.log(`num2: ${num2}`);

        num1 = operate(pastOperator, num1, num2);
        bgDisplay.textContent = num1 + sign;
        resultBgDisplay = num1 + sign;
        pastOperator = operator;

        console.log(`num1: ${num1}`);

        num2String = "";
        num2 = 0;
        currentDisplay.textContent = num2;
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
