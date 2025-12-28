let currentInput = "";
const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

// বাটনগুলোর নাম বাংলা উচ্চারণে
const buttonNames = {
    '0': 'শূন্য', '1': 'এক', '2': 'দুই', '3': 'তিন', '4': 'চার',
    '5': 'পাঁচ', '6': 'ছয়', '7': 'সাত', '8': 'আট', '9': 'নয়',
    '+': 'যোগ', '-': 'বিয়োগ', '*': 'গুণ', '/': 'ভাগ', 
    '%': 'শতকরা', '(': 'ব্রাকেট শুরু', ')': 'ব্রাকেট শেষ', 
    '.': 'দশমিক', '=': 'সমান সমান', 'AC': 'সব মুছে ফেলুন', 'delete': 'মুছুন'
};

// কথা বলার জন্য প্রধান ফাংশন
function speak(text) {
    // আগের কোনো কথা চললে তা থামিয়ে দিবে যাতে দ্রুত কাজ করে
    window.speechSynthesis.cancel(); 
    
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = 'bn-BD';
    speech.rate = 1.2; // একটু দ্রুত কথা বলবে যাতে ইউজার বিরক্ত না হয়
    window.speechSynthesis.speak(speech);
}

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
    speak(buttonNames[char] || char); // বাটনের নাম বলবে
    currentInput += char;
    updateDisplay();
}

function appendOperator(op) {
    // 'এর' বাটনকেও গুণ হিসেবে ধরা হয়েছে
    let name = buttonNames[op] || "এর";
    speak(name); 
    
    if (currentInput === "" && (op === '*' || op === '/' || op === '%')) return;
    currentInput += op;
    updateDisplay();
}

function clearDisplay() {
    speak(buttonNames['AC']);
    currentInput = "";
    updateDisplay();
}

function deleteLast() {
    speak(buttonNames['delete']);
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function calculate() {
    try {
        let expression = currentInput.replace(/%/g, '/100');
        let result = eval(expression);
        
        if (!Number.isInteger(result)) {
            result = parseFloat(result.toFixed(4));
        }
        
        let finalResult = result.toString();
        currentInput = finalResult;
        updateDisplay();
        
        // ফলাফল বাংলায় ঘোষণা করা
        speak("ফলাফল হলো " + toBengali(finalResult));
        
    } catch (e) {
        document.getElementById('display').innerText = "ভুল হয়েছে";
        speak("ভুল হয়েছে");
        currentInput = "";
    }
}
