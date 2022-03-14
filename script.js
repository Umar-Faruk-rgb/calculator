let currentNumber = [];
let currentOperator = '';
let num1 = 0;
let lastvalue;

//Selectors
const one = document.querySelector('#one');
const two = document.querySelector('#two');
const three = document.querySelector('#three');
const four = document.querySelector('#four');
const five = document.querySelector('#five');
const six = document.querySelector('#six');
const seven = document.querySelector('#seven');
const eight = document.querySelector('#eight');
const nine = document.querySelector('#nine');
const zero = document.querySelector('#zero');
const dot = document.querySelector('#dot');

const divide = document.querySelector('#divide');
const times = document.querySelector('#times');
const minus = document.querySelector('#minus');
const plus = document.querySelector('#plus');
const clear = document.querySelector('#clear');
const del = document.querySelector('#delete');
const equal = document.querySelector('#equal');
const screenDown = document.querySelector('#bottom-line');
const screenUp = document.querySelector('#top-line');

const numbersList = [zero, one, two, three, four, five, six, seven, eight, nine];

//Event listeners
for (let i=0; i<10; i++){
    numbersList[i].addEventListener('click', () => {
        currentNumber.push(i);
        let temp = document.createElement('div');
        temp.innerHTML = i;
        screenDown.append(temp);
        if (currentOperator === 'equal'){
            currentOperator = '';
        }
    });
}

dot.addEventListener('click', () => {
    currentNumber.push('.');
        let temp = document.createElement('div');
        temp.innerHTML = '.';
        screenDown.append(temp);
        if (currentOperator === 'equal'){
            currentOperator = '';
        }
});

divide.addEventListener('click', division);
times.addEventListener('click', multiplication);
minus.addEventListener('click', subtraction);
plus.addEventListener('click', addition);
del.addEventListener('click', deleteOne);
clear.addEventListener('click', deleteAll);
equal.addEventListener('click', operate);

//Functions
function operate(){
    evaluate();
    if(lastvalue !== 0){
        let temp = document.createElement('div');
        temp.innerHTML = `${lastvalue} =`;
        screenUp.appendChild(temp);
        screenDown.innerHTML = num1;
        currentOperator = 'equal';
        currentNumber = [];
    }
}

function addition(){
    evaluate();
    screenUp.innerHTML = `${num1} + `;
    currentNumber = [];
    currentOperator = 'plus';
    screenDown.innerHTML = '';
}

function subtraction(){
    evaluate();
    screenUp.innerHTML = `${num1} −`;
    currentNumber = [];
    currentOperator = 'minus';
    screenDown.innerHTML = '';
}

function multiplication(){
    evaluate();
    screenUp.innerHTML = `${num1} × `;
    currentNumber = [];
    currentOperator = 'times';
    screenDown.innerHTML = '';
}

function division(){
    evaluate();
    screenUp.innerHTML = `${num1} ÷ `;
    currentNumber = [];
    currentOperator = 'divide';
    screenDown.innerHTML = '';
}

function evaluate(){
    let n = currentNumber.length - 1;
    let holder = 0;

    if (currentNumber.includes('.')){
        let wholePart = 0;
        let decimalPart = 0;
        let wholeArray = [];
        let decimalArray = [];

        //separate whole from decimal
        for (let i=0; i<=n; i++){
            if(currentNumber[i] !== '.'){
                wholeArray.push(currentNumber[i]);
            }
            else{
                for(let j=i+1; j<=n; j++){
                    decimalArray.push(currentNumber[j]);
                }

                i = n + 1; // This is to stop the program from going back to the outer for loop
            }
        }

        //calculate whole part
        let m = wholeArray.length - 1;
        for (let i=m; i>=0; i--){
            wholePart += wholeArray[m - i] * (10 ** i);
        }

        //calculate decimal part
        m = decimalArray.length - 1;
        for (let i=m; i>=0; i--){
            decimalPart += decimalArray[m - i] * (10 ** i);
        }
        decimalPart = decimalPart / (10 ** (m+1));

        holder = wholePart + decimalPart;
    }
    else{
        for (let i=n; i>=0; i--){
            holder += currentNumber[n - i] * (10 ** i);
        }
    }


    if (currentOperator === 'plus'){
        num1 += holder;
    }
    else if (currentOperator === 'minus'){
        num1 -= holder;
    }
    else if (currentOperator === 'times'){
        num1 *= holder;
    }
    else if (currentOperator === 'divide'){
        if(holder !== 0){
            num1 /= holder;
        }
        else{
            window.alert("You cannot divide by 0");
        }
    }
    else if(currentOperator === ''){
        num1 = holder;
    }
    lastvalue = holder;

    if(num1 - Math.floor(num1) !== 0){
        num1 = Math.round(num1 * 1000)/1000;
    }
}

function deleteOne(){
    currentNumber.pop();
    screenDown.removeChild(screenDown.lastChild);
    if (currentOperator === 'equal'){
        currentNumber = [];
    }
}

function deleteAll(){
    screenDown.innerHTML = '';
    screenUp.innerHTML = '';
    currentNumber = [];
    num1 = 0;
    currentOperator = '';
}