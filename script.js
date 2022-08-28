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

let pastOperator = function (x, y){
    return x;
};
let initialNumpad = true;
let clearNum2 = false;

let currentDisplay = document.querySelector(".current-display");
let bgDisplay = document.querySelector(".background-display");


let num1String = "";
let num2String = "";
let num1 = 0;
let num2 = ''
console.log(numButtons);

for (numBtn of numButtons) {
    numBtn.addEventListener("click", (e) => {
        if (initialNumpad){
            num1String += e.target.textContent;
            console.log(`num1string: ${num1String}`);
            num1 = parseInt(num1String);    
            currentDisplay.textContent = num1String;
        }
    })
}


function numpad(){
    for (numBtn of numButtons) {
        numBtn.addEventListener("click", (e) => {
            if (!initialNumpad){
                num2String += e.target.textContent;
                num2 = parseInt(num2String);
                currentDisplay.textContent = num2;
    
                console.log(`num2string:${num2String}`);
                console.log(`num2:${num2}`);
            }
        })
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
    console.log(`result: ${result}`);
    bgDisplay.textContent = "";
    currentDisplay.textContent = result;
})

clearBtn.addEventListener("click", (e) => {
    initializeAll();
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

        bgDisplay.textContent = num1;
        currentDisplay.textContent = num1String + sign
        numpad(num2String);
    }
    else{
        console.log(operator);
        console.log(`num1: ${num1}`);
        console.log(`num2: ${num2}`);

        num1 = operate(pastOperator, num1, num2);
        bgDisplay.textContent = num1 + sign;
        pastOperator = operator;

        console.log(`num1: ${num1}`);

        // clearNum2 = true;
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
    initialNumpad = true;

    console.log("AC");

}