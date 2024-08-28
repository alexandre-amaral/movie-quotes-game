let quotes = [];
let currentQuote = {};

async function loadQuotes() {
    const response = await fetch('data/quotes.json');
    quotes = await response.json();
    showRandomQuote();
}

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    currentQuote = quotes[randomIndex];
    document.getElementById('quote').innerText = currentQuote.quote;
    document.getElementById('result').innerText = '';
    document.getElementById('next-quote').classList.add('d-none');
    generateOptions();
}

function generateOptions() {
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    // Create an array with the correct answer and two random incorrect answers
    const options = [currentQuote.movie];
    while (options.length < 3) {
        const randomMovie = quotes[Math.floor(Math.random() * quotes.length)].movie;
        if (!options.includes(randomMovie)) {
            options.push(randomMovie);
        }
    }

    // Shuffle the options
    options.sort(() => Math.random() - 0.5);

    // Create buttons for each option
    options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-outline-light', 'btn-lg', 'w-100', 'option-button');
        button.innerText = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    const buttons = document.querySelectorAll('.option-button');
    buttons.forEach(button => {
        button.onclick = null; // Disable further clicks
        if (button.innerText === currentQuote.movie) {
            button.classList.remove('btn-outline-light');
            button.classList.add('btn-success'); // Correct answer in green
        } else {
            button.classList.remove('btn-outline-light');
            button.classList.add('btn-danger'); // Wrong answer in red
            button.innerHTML = `${button.innerText} <span class="ms-2">✖</span>`; // Add "X" to wrong answers
        }
    });
    
    document.getElementById('next-quote').classList.remove('d-none');
}

function showAnswer() {
    const buttons = document.querySelectorAll('.option-button');
    buttons.forEach(button => {
        button.onclick = null; // Disable further clicks
        if (button.innerText === currentQuote.movie) {
            button.classList.remove('btn-outline-light');
            button.classList.add('btn-success'); // Correct answer in green
        } else {
            button.classList.remove('btn-outline-light');
            button.classList.add('btn-danger'); // Wrong answer in red
            button.innerHTML = `${button.innerText} <span class="ms-2">✖</span>`; // Add "X" to wrong answers
        }
    });

    document.getElementById('result').innerText = `The correct answer is ${currentQuote.movie}.`;
    document.getElementById('result').classList.add('text-info');
    document.getElementById('result').classList.remove('text-success', 'text-danger');
    document.getElementById('next-quote').classList.remove('d-none');
}

function skipQuote() {
    showRandomQuote();
}

function nextQuote() {
    showRandomQuote();
}

loadQuotes();