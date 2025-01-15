// ./src/js/calc.js

// Get references to the display and buttons
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');

// Variable to hold the current input and operation
let currentInput = '';
let operator = '';
let firstOperand = null;

// Function to update the display
function updateDisplay(value) {
    display.value = value;
}

// Function to handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        // If an operator is clicked
        if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput) {
                // If there's already an operator, replace it instead of appending
                if (operator) {
                    currentInput = currentInput.slice(0, -1); // Remove the last operator
                }
                operator = value;
                currentInput += ` ${operator} `; // Include spaces for readability
            }
        } else {
            // Append the number to the current input
            currentInput += value;
        }

        // Update the display
        updateDisplay(currentInput);
    });
});

// Function to perform the calculation
function calculate() {
    if (firstOperand !== null && currentInput !== '') {
        const secondOperand = parseFloat(currentInput.split(' ').pop()); // Get the last number
        let result;

        switch (operator) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                result = firstOperand / secondOperand;
                break;
            default:
                return;
        }

        // Display the result
        updateDisplay(result);
        // Reset for the next calculation
        currentInput = '';
        operator = '';
        firstOperand = null;
    }
}

// Event listener for the equals button
equalsButton.addEventListener('click', () => {
    firstOperand = parseFloat(currentInput.split(' ')[0]); // Get the first number
    calculate();
});

// Event listener for the clear button
clearButton.addEventListener('click', () => {
    currentInput = '';
    operator = '';
    firstOperand = null;
    updateDisplay('');
});