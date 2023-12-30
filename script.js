class Calculator {
  constructor(poTe, cote) {
    this.poTe = poTe;
    this.cote = cote;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.prevOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.prevOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.prevOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.prevOperand);
    const curr = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(curr)) {
      return;
    }
    switch (this.operation) {
      case '+':
        computation = prev + curr;
        break;
      case '-':
        computation = prev - curr;
        break;
      case '*':
        computation = prev * curr;
        break;
      case '÷':
        computation = prev / curr;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.prevOperand = "";
  }
  getDisplay(number) {
    const StringNum = number.toString();
    const IntegerNum = parseFloat(StringNum.split(".")[0]);
    const DecimalNum = StringNum.split(".")[1];
    let integerDisplay;
    if (isNaN(IntegerNum)) {
      integerDisplay = "";
    } else {
      integerDisplay = IntegerNum.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (DecimalNum != null) {
      return `${integerDisplay}.${DecimalNum}`;
    } else {
      return integerDisplay;
    }
    const floatNum = parseFloat(number);
    if (isNaN(floatNum)) return "";
    return floatNum.toLocaleString("en");
  }
  updateDisplay() {
    this.cote.innerText = this.getDisplay(this.currentOperand);
    if (this.operation != null) {
      this.poTe.innerText =
        `${this.getDisplay(this.prevOperand)} ${this.operation}`;
    } else {
      this.poTe.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operand]");
const equalButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");
const previousButton = document.querySelector("[data-previous-output]");
const currentButton = document.querySelector("[data-current-output]");

const calculator = new Calculator(previousButton, currentButton);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
