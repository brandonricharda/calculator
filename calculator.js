//Initial Preset Functions (Incl. Button Creation)
let status = {
    displayObject : document.querySelector('#calculator-input'),
    current : 'placeholder',
    runningTally : 0,
    firstNumberOfOperation : 0,
    secondNumberOfOperation : 0,
    operation : 'placeholder',
    result : 0,
    numberOfRuns : 0,
    loopAlert : '',
    decimalAlert : ''
}
status.displayObject.textContent = 0;
for (i = 0; i <= 10; i++) {
    if (i <= 9) {
        let calculatorNumbers = document.querySelector('#calculator-numbers');
        let numberButton = document.createElement('button');
        numberButton.setAttribute('id', 'button' + i);
        numberButton.textContent = i;
        calculatorNumbers.appendChild(numberButton);
        numberButton.style.gridArea = 'button' + i;
        numberButton.addEventListener('click', () => numberInput(numberButton.textContent));
    } else {
        let calculatorNumbers = document.querySelector('#calculator-numbers');
        let decimalButton = document.createElement('button');
        decimalButton.setAttribute('id', 'buttonDecimal');
        decimalButton.textContent = ' \267 ';
        decimalButton.style.fontSize = '60px';
        calculatorNumbers.appendChild(decimalButton);
        decimalButton.style.gridArea = 'buttonDecimal';
        decimalButton.addEventListener('click', () => numberInput('.'));
    }
}
for (j = 0; j < 6; j++) {
    let calculatorOperations = document.querySelector('#calculator-operations');
    let operationButton = document.createElement('button');
    if (j == 0) {
        operationButton.textContent = '+';
        operationButton.setAttribute('id', 'add');
    } else if (j == 1) {
        operationButton.textContent = '-';
        operationButton.setAttribute('id', 'subtract');
    } else if (j == 2) {
        operationButton.textContent = 'X';
        operationButton.setAttribute('id', 'multiply');
    } else if (j == 3) {
        operationButton.textContent = '/';
        operationButton.setAttribute('id', 'divide');
    } else if (j == 4) {
        operationButton.textContent = '=';
        operationButton.setAttribute('id', 'equals');
        operationButton.addEventListener('click', () => equals());
    } else {
        operationButton.textContent = 'Clear';
        operationButton.setAttribute('id', 'clear');
        operationButton.addEventListener('click', () => clear());
    }
    calculatorOperations.appendChild(operationButton);
    operationButton.style.gridArea = 'operation' + j;
    operationButton.addEventListener('click', () => operationSelector(operationButton.id));
}
//Arithmetic Functions
function add() {
    status.displayObject.textContent = parseInt(status.firstNumberOfOperation) + parseInt(status.secondNumberOfOperation);
    prepareNextRound();
}
function subtract(num1, num2) {
    status.displayObject.textContent = status.firstNumberOfOperation - status.secondNumberOfOperation;
    prepareNextRound();
}
function multiply() {
    status.displayObject.textContent = status.firstNumberOfOperation * status.secondNumberOfOperation;
    status.result = status.displayObject.textContent;
    prepareNextRound();
}
function divide() {
    if (status.firstNumberOfOperation == 0 || status.secondNumberOfOperation == 0) {
        status.displayObject.textContent = 'You sneaky bastard...';
    } else {
        status.displayObject.textContent = status.firstNumberOfOperation / status.secondNumberOfOperation;
    }
    prepareNextRound();
}
function equals() {
    status.numberOfRuns++;
    if (status.numberOfRuns == 1 || status.loopAlert != 'active') {
        status.secondNumberOfOperation = status.runningTally;
    } 
    let operationToRun = status.operation;
    window[operationToRun]();
}
//Button Click Functions
function operationSelector(buttonPressed) {
    status.firstNumberOfOperation = status.runningTally;
    if (buttonPressed != 'equals') {
        status.operation = buttonPressed;
        afterOperationButtonClick();
    } else {
        status.loopAlert = 'active';
    }
}
function numberInput (number) {
    if (number != 0 || status.current != 'placeholder') {
        if (status.current == 'placeholder' && number != '.') {
            status.current = number;
            status.displayObject.textContent = status.current;
            status.runningTally = status.current;
        } else if (number == '.' && status.decimalAlert == '') {
            status.decimalAlert = 'active';
            status.current = number;
            status.displayObject.textContent = ('' + status.runningTally + status.current);
            status.runningTally = status.displayObject.textContent;                
        } else if (number != '.') {
            status.current = number;
            status.displayObject.textContent = ('' + status.runningTally + status.current);
            status.runningTally = status.displayObject.textContent;
        }
    } else if (number == 0 && status.current == 'placeholder') {
        //Do nothing; user is trying to start a bunber with zero.
    }
}
//Logic Functions
function prepareNextRound() {
    status.result = status.displayObject.textContent;
    status.current = 'placeholder';
    status.runningTally = status.result;
}
function afterOperationButtonClick() {
    status.current = 'placeholder';
    status.runningTally = 0;
    status.loopAlert = '';
    status.decimalAlert = '';
}
function clear() {
    status.displayObject = document.querySelector('#calculator-input');
    status.current = 'placeholder';
    status.runningTally = 0;
    status.firstNumberOfOperation = 0;
    status.secondNumberOfOperation = 0;
    status.operation = 'placeholder';
    status.result = 0;
    status.numberOfRuns = 0;
    status.loopAlert = '';
    status.displayObject.textContent = 0;
    status.decimalAlert = '';
}