//Initial Presets
let status = {
    mainDisplay : document.querySelector('#calculator-input'),
    current : 'placeholder',
    runningTally : 0,
    firstNumberOfOperation : 0,
    secondNumberOfOperation : 0,
    operation : 'placeholder',
    result : 0,
    numberOfRuns : 0,
    loopAlert : '',
    decimalAlert : '',
    numToBackspace : '',
}
//Creates Number Buttons
status.mainDisplay.textContent = 0;
for (i = 0; i <= 11; i++) {
    let calculatorNumbers = document.querySelector('#calculator-numbers');
    if (i <= 9) {
        let numberButton = document.createElement('button');
        numberButton.setAttribute('id', 'button' + i);
        numberButton.textContent = i;
        calculatorNumbers.appendChild(numberButton);
        numberButton.style.gridArea = 'button' + i;
        numberButton.addEventListener('click', () => numberInput(numberButton.textContent));
    } else if (i == 10) {
        let decimalButton = document.createElement('button');
        decimalButton.setAttribute('id', 'buttonDecimal');
        decimalButton.textContent = ' \267 ';
        decimalButton.style.fontSize = '60px';
        calculatorNumbers.appendChild(decimalButton);
        decimalButton.style.gridArea = 'buttonDecimal';
        decimalButton.addEventListener('click', () => numberInput('.'));
    } else if (i == 11) {
        let backspaceButton = document.createElement('button');
        backspaceButton.setAttribute('id', 'buttonDecimal');
        backspaceButton.textContent = 'DEL';
        calculatorNumbers.appendChild(backspaceButton);
        backspaceButton.style.gridArea = 'backspaceButton';
        backspaceButton.addEventListener('click', () => backspace());
    }
}
//Creates Operator Buttons
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
    operationButton.setAttribute('id', 'operationButton');
    operationButton.addEventListener('click', () => operationSelector(operationButton.id));
}
//Arithmetic Functions
function add() {
    status.mainDisplay.textContent = parseInt(status.firstNumberOfOperation) + parseInt(status.secondNumberOfOperation);
    prepareNextRound();
}
function subtract() {
    status.mainDisplay.textContent = status.firstNumberOfOperation - status.secondNumberOfOperation;
    prepareNextRound();
}
function multiply() {
    status.mainDisplay.textContent = status.firstNumberOfOperation * status.secondNumberOfOperation;
    prepareNextRound();
}
function divide() {
    if (status.firstNumberOfOperation == 0 || status.secondNumberOfOperation == 0) {
        status.mainDisplay.textContent = 'Error';
    } else {
        status.mainDisplay.textContent = status.firstNumberOfOperation / status.secondNumberOfOperation;
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
            status.mainDisplay.textContent = status.current;
            status.runningTally = status.current;
        } else if (number == '.' && status.decimalAlert == '') {
            status.decimalAlert = 'active';
            status.current = number;
            status.mainDisplay.textContent = ('' + status.runningTally + status.current);
            status.runningTally = status.mainDisplay.textContent;                
        } else if (number != '.' && number != 'backspace') {
            status.current = number;
            status.mainDisplay.textContent = ('' + status.runningTally + status.current);
            status.runningTally = status.mainDisplay.textContent;
        }
    } else if (number == 0 && status.current == 'placeholder') {
        //Do nothing; user is trying to start a number with zero.
    } 
}
function clear() {
    status.current = 'placeholder';
    status.runningTally = 0;
    status.firstNumberOfOperation = 0;
    status.secondNumberOfOperation = 0;
    status.operation = 'placeholder';
    status.result = 0;
    status.numberOfRuns = 0;
    status.loopAlert = '';
    status.mainDisplay.textContent = 0;
    status.decimalAlert = '';
}
function backspace() {
    status.numToBackspace = status.mainDisplay.textContent;
    status.mainDisplay.textContent = status.numToBackspace.slice(0, -1);
    status.runningTally = status.mainDisplay.textContent;
}
document.onkeydown = function(event) {
    if (event.key == 'Backspace') {
        backspace();
    } else if (event.key < 10) {
        numberInput(event.key);
        let buttonToUpdate = document.querySelector('#' + 'button' + event.key);
        buttonToUpdate.style.background = 'lightgreen';
    } else if (event.key == 'Enter') {
        equals();
        operationSelector('equals');
    } else if (event.key == 'x') {
        operationSelector('multiply');
    } else if (event.key == '/') {
        operationSelector('divide');
    } else if (event.key == '.') {
        numberInput('.');
    } else if (event.key == 'Escape') {
        clear();
    } else if (event.key == '-') {
        operationSelector('subtract');
    } else if (event.key == '+') {
        operationSelector('add');
    }
}
document.onkeyup = function(event) {
    if (event.key < 10) {
        let buttonToReset = document.querySelector('#' + 'button' + event.key);
        buttonToReset.style.background = 'lightblue';
    }
}
//Logic Functions
function prepareNextRound() {
    status.result = status.mainDisplay.textContent;
    status.current = 'placeholder';
    status.runningTally = status.result;
}
function afterOperationButtonClick() {
    status.current = 'placeholder';
    status.runningTally = 0;
    status.loopAlert = '';
    status.decimalAlert = '';
}