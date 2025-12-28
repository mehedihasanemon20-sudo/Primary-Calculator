let currentInput = "";
const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

function toBengali(str) {
    return str.toString()
        .replace(/\d/g, d => bengaliDigits[d])
        .replace(/\//g, '÷')
        .replace(/\*/g, '×');
}

function updateDisplay() {
    const displayElement = document.getElementById('display');
    displayElement.innerText = currentInput === "" ? "০" : toBengali(currentInput);
}

function appendNumber(char) {
    currentInput += char;
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === "" && (op === '*' || op === '/' || op === '%')) return;
    currentInput += op;
    updateDisplay();
}

function clearDisplay() {
    currentInput = "";
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function calculate() {
    try {
        // শতকরা (%) কে গণিতের জন্য /100 এ রূপান্তর
        let expression = currentInput.replace(/%/g, '/100');
        
        // রেজাল্ট বের করা
        let result = eval(expression);
        
        // রেজাল্ট যদি দশমিক হয় তবে ২ ঘর পর্যন্ত রাখা
        if (!Number.isInteger(result)) {
            result = parseFloat(result.toFixed(4));
        }
        
        currentInput = result.toString();
        updateDisplay();
    } catch (e) {
        document.getElementById('display').innerText = "ভুল ইনপুট";
        currentInput = "";
    }
}
