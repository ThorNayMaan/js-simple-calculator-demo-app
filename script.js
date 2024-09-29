const input = document.querySelector('.input-num');
const clear = document.querySelector('.clear');
const backspace = document.querySelector('.backspace');
const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const equal = document.querySelector('.equal');
const multiplication = document.querySelector('.multiplication');
const division = document.querySelector('.division');
const calNums = document.querySelectorAll('.cal-num');
const inputInfo = document.querySelectorAll('.input-info');

let storedValue = [];
let result = 0;
let calcu = '';

function calcuSignBtnWork(sign) {
    if (input.value == '0') {
        console.log('lol');
    } else {
        calcu = sign;
        if (result == 0) {
            storedValue.push(+input.value);
        } else {
            storedValue = [+input.value];
            result = 0;
        }
        input.value = '';
        inputInfo[0].childNodes[0].data =
            '- ' + storedValue[storedValue.length - 1] + ' -';
    }
}

function resultFunc() {
    input.value = result;
    storedValue = [result];
    calcu = '';
    inputInfo[0].childNodes[0].data =
        '- ' + storedValue[storedValue.length - 1] + ' -';
}

calNums.forEach(n => {
    n.addEventListener('click', e => {
        if (input.value.startsWith('0')) input.value = ''; //to reset the input: remove zero
        input.value += +e.target.innerText;
    });
});

equal.addEventListener('click', () => {
    if (calcu === 'substraction') {
        storedValue.push(+input.value);
        result = storedValue.reduce((a, n) => a - n);
        resultFunc();
    }

    if (calcu === 'addition') {
        storedValue.push(+input.value);
        result = storedValue.reduce((a, n) => a + n); //only this way: not turn into NaN
        resultFunc();
    }

    if (calcu === 'multiplication') {
        storedValue.push(+input.value);
        result = storedValue.reduce((a, n) => a * n);
        resultFunc();
    }

    if (calcu === 'division') {
        storedValue.push(+input.value);
        result = storedValue.reduce((a, n) => a / n);
        resultFunc();
    }
});

plus.addEventListener('click', () => {
    calcuSignBtnWork('addition');
});

minus.addEventListener('click', () => {
    calcuSignBtnWork('substraction');
});

multiplication.addEventListener('click', () => {
    calcuSignBtnWork('multiplication');
});

division.addEventListener('click', () => {
    calcuSignBtnWork('division');
});

clear.addEventListener('click', () => {
    input.value = '0'; //only reset the visually input value: not storedValue var
});

backspace.addEventListener('click', () => {
    input.value = input.value.slice(0, input.value.length - 1);
});

// BUG: There's an issue with consequence calculation; meaing operation does only on the lastest operator, although 'plus' went before 'minus', all the inputed number will be operation on the lastest 'minus' and has skipped the 'plus'.
