let quotes = [];
let currentQuote = {};
let streak = 0;
let timer;
let timeLeft = 30;

async function loadQuotes() {
    const response = await fetch('data/quotes.json');
    quotes = await response.json();
    showRandomQuote();
}

function showRandomQuote() {
    clearInterval(timer);
    resetTimer();
    const randomIndex = Math.floor(Math.random() * quotes.length);
    currentQuote = quotes[randomIndex];
    document.getElementById('quote').innerText = currentQuote.quote;
    document.getElementById('result').innerText = '';
    generateOptions();
    startTimer();
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
    clearInterval(timer);
    const buttons = document.querySelectorAll('.option-button');
    let isCorrect = false;

    buttons.forEach(button => {
        button.onclick = null;
        if (button.innerText === currentQuote.movie) {
            button.classList.remove('btn-outline-light');
            button.classList.add('btn-success');
            isCorrect = (selectedOption === currentQuote.movie);
        } else {
            button.classList.remove('btn-outline-light');
            button.classList.add('btn-danger');
            button.innerHTML = `${button.innerText} <span class="ms-2">✖</span>`;
        }
    });

    if (isCorrect) {
        streak++;
        document.getElementById('result').innerText = 'Correct!';
    } else {
        streak = 0;
        document.getElementById('result').innerText = `Wrong! The correct answer was ${currentQuote.movie}.`;
    }

    updateStreak();
    setTimeout(nextQuote, 3000);
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(null); // Força a verificação como se o tempo tivesse acabado
        }
    }, 1000);
}

function resetTimer() {
    timeLeft = 30;
    document.getElementById('timer').innerText = `Time Left: 30s`;
}

function updateStreak() {
    document.getElementById('streak').innerText = `Streak: ${streak}`;
}

function skipQuote() {
    streak = 0;
    updateStreak();
    nextQuote();
}

function nextQuote() {
    showRandomQuote();
}

loadQuotes();