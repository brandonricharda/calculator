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
var { mainDisplay, current, runningTally, firstNumberOfOperation, secondNumberOfOperation, operation, result, numberOfRuns, loopAlert, decimalAlert, numToBackspace } = status;
//Creates Number Buttons
mainDisplay.textContent = 0;
for (i = 0; i <= 11; i++) {
    let calculatorNumbers = document.querySelector('#calculator-numbers');
    if (i <= 9) {
        let numberButton = document.createElement('button');
        numberButton.setAttribute('id', 'button' + i);
        numberButton.textContent = i;
        calculatorNumbers.appendChild(numberButton);
        numberButton.style.gridArea = 'button' + i;
        numberButton.addEventListener('click', () => {numberInput(numberButton.textContent), numberLightOnOff('#' + 'button' + numberButton.textContent)});
    } else if (i == 10) {
        let decimalButton = document.createElement('button');
        decimalButton.setAttribute('id', 'buttonDecimal');
        decimalButton.textContent = ' \267 ';
        decimalButton.style.fontSize = '60px';
        calculatorNumbers.appendChild(decimalButton);
        decimalButton.style.gridArea = 'buttonDecimal';
        decimalButton.addEventListener('click', () => {numberInput('.'), numberLightOnOff('#buttonDecimal')});
    } else if (i == 11) {
        let backspaceButton = document.createElement('button');
        backspaceButton.setAttribute('id', 'buttonDelete');
        backspaceButton.textContent = 'DEL';
        calculatorNumbers.appendChild(backspaceButton);
        backspaceButton.style.gridArea = 'backspaceButton';
        backspaceButton.addEventListener('click', () => {numberLightOnOff('#buttonDelete'), buttonDelete()});
    }
}
//Creates Operator Buttons
for (j = 0; j < 6; j++) {
    let calculatorOperations = document.querySelector('#calculator-operations');
    let operationButton = document.createElement('button');
    if (j == 0) {
        operationButton.textContent = '+';
        operationButton.setAttribute('id', 'buttonAdd');
    } else if (j == 1) {
        operationButton.textContent = '-';
        operationButton.setAttribute('id', 'buttonSubtract');
    } else if (j == 2) {
        operationButton.textContent = 'X';
        operationButton.setAttribute('id', 'buttonMultiply');
    } else if (j == 3) {
        operationButton.textContent = '/';
        operationButton.setAttribute('id', 'buttonDivide');
    } else if (j == 4) {
        operationButton.textContent = '=';
        operationButton.setAttribute('id', 'buttonEquals');
        operationButton.addEventListener('click', () => buttonEquals());
    } else {
        operationButton.textContent = 'Clear';
        operationButton.setAttribute('id', 'buttonClear');
        operationButton.addEventListener('click', () => buttonClear());
    }
    calculatorOperations.appendChild(operationButton);
    operationButton.style.gridArea = 'operation' + j;
    operationButton.addEventListener('click', () => {operationSelector(operationButton.id), operationLightOnOff('#' + operationButton.id)});
}
//Arithmetic Functions
function buttonAdd() {
    mainDisplay.textContent = parseInt(firstNumberOfOperation) + parseInt(secondNumberOfOperation);
    prepareNextRound();
}
function buttonSubtract() {
    mainDisplay.textContent = firstNumberOfOperation - secondNumberOfOperation;
    prepareNextRound();
}
function buttonMultiply() {
    mainDisplay.textContent = firstNumberOfOperation * secondNumberOfOperation;
    prepareNextRound();
}
function buttonDivide() {
    if (firstNumberOfOperation == 0 || secondNumberOfOperation == 0) {
        mainDisplay.textContent = 'Error';
    } else {
        mainDisplay.textContent = firstNumberOfOperation / secondNumberOfOperation;
    }
    prepareNextRound();
}
function buttonEquals() {
    numberOfRuns++;
    if (numberOfRuns == 1 || loopAlert != 'active') {
        secondNumberOfOperation = runningTally;
    } 
    let operationToRun = operation;
    window[operationToRun]();
}
//Button Click Functions
function operationSelector(buttonPressed) {
    firstNumberOfOperation = runningTally;
    if (buttonPressed != 'buttonEquals') {
        operation = buttonPressed;
        afterOperationButtonClick();
    } else {
        loopAlert = 'active';
    }
}
function numberInput (number) {
    if (number != 0 || current != 'placeholder') {
        if (current == 'placeholder' && number != '.') {
            current = number;
            mainDisplay.textContent = current;
            runningTally = current;
        } else if (number == '.' && decimalAlert == '') {
            decimalAlert = 'active';
            current = number;
            mainDisplay.textContent = ('' + runningTally + current);
            runningTally = mainDisplay.textContent;                
        } else if (number != '.') {
            current = number;
            mainDisplay.textContent = ('' + runningTally + current);
            runningTally = mainDisplay.textContent;
        }
    } else if (number == 0 && current == 'placeholder') {
        //Do nothing; user is trying to start a number with zero.
    } 
}
function buttonClear() {
    current = 'placeholder';
    runningTally = 0;
    firstNumberOfOperation = 0;
    secondNumberOfOperation = 0;
    operation = 'placeholder';
    result = 0;
    numberOfRuns = 0;
    loopAlert = '';
    mainDisplay.textContent = 0;
    decimalAlert = '';
}
function buttonDelete() {
    numToBackspace = mainDisplay.textContent;
    mainDisplay.textContent = numToBackspace.slice(0, -1);
    runningTally = mainDisplay.textContent;
}
document.onkeydown = function(event) {
    if (event.key == 'Backspace') {
        buttonDelete();
        numberLightOnOff('#buttonDelete');
    } else if (event.key < 10) {
        numberInput(event.key);
        numberLightOnOff('#' + 'button' + event.key);
    } else if (event.key == 'Enter') {
        buttonEquals();
        operationSelector('buttonEquals');
        operationLightOnOff('#buttonEquals');
    } else if (event.key == 'x') {
        operationSelector('buttonMultiply');
        operationLightOnOff('#buttonMultiply')
    } else if (event.key == '/') {
        operationSelector('buttonDivide');
        operationLightOnOff('#buttonDivide');
    } else if (event.key == '.') {
        numberInput('.');
        numberLightOnOff('#buttonDecimal');
    } else if (event.key == 'Escape') {
        buttonClear();
        operationLightOnOff('#buttonClear');
    } else if (event.key == '-') {
        operationSelector('buttonSubtract');
        operationLightOnOff('#buttonSubtract');
    } else if (event.key == '+') {
        operationSelector('buttonAdd');
        operationLightOnOff('#buttonAdd');
    }
}
function numberLightOnOff(keyPressed) {
    numberLightPress(keyPressed);
    setTimeout(function() {
        undoNumberLightPress(keyPressed)
    }, 100);
}
function operationLightOnOff(keyPressed) {
    operationLightPress(keyPressed);
    setTimeout(function() {
        undoOperationLightPress(keyPressed);
    }, 100);
}
function numberLightPress(keyPressed) {
    let buttonToUpdate = document.querySelector(keyPressed);
    buttonToUpdate.style.background = 'lightgreen';
}
function operationLightPress(keyPressed) {
    let buttonToUpdate = document.querySelector(keyPressed);
    buttonToUpdate.style.background = 'lightgreen';
}
function undoNumberLightPress(keyPressed) {
    let buttonToUpdate = document.querySelector(keyPressed);
    buttonToUpdate.style.background = 'lightblue';
}
function undoOperationLightPress(keyPressed) {
    let buttonToUpdate = document.querySelector(keyPressed);
    buttonToUpdate.style.background = 'lightgrey';
}
//Logic Functions
function prepareNextRound() {
    result = mainDisplay.textContent;
    current = 'placeholder';
    runningTally = result;
}
function afterOperationButtonClick() {
    current = 'placeholder';
    runningTally = 0;
    loopAlert = '';
    decimalAlert = '';
}