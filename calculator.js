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
        numberButton.addEventListener('click', function() {
            numberInput(numberButton.textContent);
            numberLightPress('#' + 'button' + numberButton.textContent);
            setTimeout(function() {
                undoNumberLightPress('#' + 'button' + numberButton.textContent);
            }, 100);
        });
    } else if (i == 10) {
        let decimalButton = document.createElement('button');
        decimalButton.setAttribute('id', 'buttonDecimal');
        decimalButton.textContent = ' \267 ';
        decimalButton.style.fontSize = '60px';
        calculatorNumbers.appendChild(decimalButton);
        decimalButton.style.gridArea = 'buttonDecimal';
        decimalButton.addEventListener('click', function() {
            numberInput('.');
            numberLightPress('#buttonDecimal');
            setTimeout(function() {
                undoNumberLightPress('#buttonDecimal');
            }, 100);
        });
    } else if (i == 11) {
        let backspaceButton = document.createElement('button');
        backspaceButton.setAttribute('id', 'buttonDelete');
        backspaceButton.textContent = 'DEL';
        calculatorNumbers.appendChild(backspaceButton);
        backspaceButton.style.gridArea = 'backspaceButton';
        backspaceButton.addEventListener('click', function() {
            numberLightPress('#buttonDelete');
            setTimeout(function() {
                undoNumberLightPress('#buttonDelete');
            }, 100);
        });
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
    operationButton.addEventListener('click', function() {
        operationSelector(operationButton.id);
        operationLightPress('#' + operationButton.id);
        setTimeout(function() {
            undoOperationLightPress('#' + operationButton.id);
        }, 100);
    });
}
//Arithmetic Functions
function buttonAdd() {
    status.mainDisplay.textContent = parseInt(status.firstNumberOfOperation) + parseInt(status.secondNumberOfOperation);
    prepareNextRound();
}
function buttonSubtract() {
    status.mainDisplay.textContent = status.firstNumberOfOperation - status.secondNumberOfOperation;
    prepareNextRound();
}
function buttonMultiply() {
    status.mainDisplay.textContent = status.firstNumberOfOperation * status.secondNumberOfOperation;
    prepareNextRound();
}
function buttonDivide() {
    if (status.firstNumberOfOperation == 0 || status.secondNumberOfOperation == 0) {
        status.mainDisplay.textContent = 'Error';
    } else {
        status.mainDisplay.textContent = status.firstNumberOfOperation / status.secondNumberOfOperation;
    }
    prepareNextRound();
}
function buttonEquals() {
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
    if (buttonPressed != 'buttonEquals') {
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
        } else if (number != '.') {
            status.current = number;
            status.mainDisplay.textContent = ('' + status.runningTally + status.current);
            status.runningTally = status.mainDisplay.textContent;
        }
    } else if (number == 0 && status.current == 'placeholder') {
        //Do nothing; user is trying to start a number with zero.
    } 
}
function buttonClear() {
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
function buttonDelete() {
    status.numToBackspace = status.mainDisplay.textContent;
    status.mainDisplay.textContent = status.numToBackspace.slice(0, -1);
    status.runningTally = status.mainDisplay.textContent;
}
document.onkeydown = function(event) {
    if (event.key == 'Backspace') {
        buttonDelete();
        numberLightPress('#buttonDelete');
        setTimeout(() => {undoNumberLightPress('#buttonDelete')}, 100);
    } else if (event.key < 10) {
        numberInput(event.key);
        numberLightPress('#' + 'button' + event.key);
        setTimeout(() => {undoNumberLightPress('#' + 'button' + event.key)}, 100);
    } else if (event.key == 'Enter') {
        buttonEquals();
        operationSelector('buttonEquals');
        operationLightPress('#buttonEquals');
        setTimeout(() => {undoOperationLightPress('#buttonEquals')}, 100);
    } else if (event.key == 'x') {
        operationSelector('buttonMultiply');
        operationLightPress('#buttonMultiply');
        setTimeout(() => {undoOperationLightPress('#buttonMultiply')}, 100);
    } else if (event.key == '/') {
        operationSelector('buttonDivide');
        operationLightPress('#buttonDivide');
        setTimeout(() => {undoOperationLightPress('#buttonDivide')}, 100);
    } else if (event.key == '.') {
        numberInput('.');
        numberLightPress('#buttonDecimal');
        setTimeout(() => {undoNumberLightPress('#buttonDecimal')}, 100);
    } else if (event.key == 'Escape') {
        buttonClear();
        operationLightPress('#buttonClear');
        setTimeout(() => {undoOperationLightPress('#buttonClear')}, 100);
    } else if (event.key == '-') {
        operationSelector('buttonSubtract');
        operationLightPress('#buttonSubtract');
        setTimeout(() => {undoOperationLightPress('#buttonSubtract')}, 100);
    } else if (event.key == '+') {
        operationSelector('buttonAdd');
        operationLightPress('#buttonAdd');
        setTimeout(() => {undoOperationLightPress('#buttonAdd')}, 100);
    }
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