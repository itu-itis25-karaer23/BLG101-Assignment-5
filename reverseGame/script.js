// DOM Element References
const challengeInput = document.getElementById("challenge");
const userInput = document.getElementById("user-input");
const timerElement = document.getElementById("timer");
const messageElement = document.getElementById("message");
const levelElement = document.getElementById("level");
const restartBtn = document.getElementById("restart-btn");
const submitBtn = document.getElementById("submit-btn");

// Arrays for random word selection
const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
const numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight",
    "nine", "ten"];
const colors = ["red", "blue", "green", "yellow", "purple", "orange", "black", "white"];

// Game state variables
let level = 1;
let challengeText = "";
let timeLeft = 45;
let timerInterval;

// Helper function to get a random element from an array
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Function to set the challenge text based on current level
function setChallengeText() {
    if (level === 1) {
        // Level 1: Random month name
        challengeText = getRandomElement(months);
    } else if (level === 2) {
        // Level 2: Random month + number
        challengeText = getRandomElement(months) + " " + getRandomElement(numbers);
    } else if (level === 3) {
        // Level 3: Random month + number + color
        challengeText = getRandomElement(months) + " " + getRandomElement(numbers) + " " + getRandomElement(colors);
    }
    challengeInput.value = challengeText;
}

// Function to start the timer
function startTimer() {
    // Clear any existing timer to prevent multiple timers running
    clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame(false);
        }
    }, 1000);
}

// Function to handle game end
function endGame(won) {
    clearInterval(timerInterval);
    
    if (won) {
        messageElement.textContent = "Congratulations! You won the game!";
        messageElement.style.color = "green";
    } else {
        messageElement.textContent = "Time's up! You lost the game.";
        messageElement.style.color = "red";
    }
    
    restartBtn.classList.remove("hidden");
    submitBtn.classList.add("hidden");
}

// Function to start/restart the game
function startGame() {
    level = 1;
    timeLeft = 45;
    
    levelElement.textContent = level;
    timerElement.textContent = timeLeft;
    
    restartBtn.classList.add("hidden");
    submitBtn.classList.remove("hidden");
    
    userInput.value = "";
    messageElement.textContent = "";
    
    setChallengeText();
    startTimer();
}

// Event listener for Submit button
submitBtn.addEventListener("click", () => {
    const reversedText = userInput.value;
    const correctReversedText = challengeText.split("").reverse().join("");
    
    if (reversedText === correctReversedText) {
        // Correct answer
        if (level === 3) {
            // Game won at level 3
            endGame(true);
        } else {
            // Move to next level
            level++;
            timeLeft = 45;
            levelElement.textContent = level;
            timerElement.textContent = timeLeft;
            messageElement.textContent = "Correct! Moving to the next level.";
            messageElement.style.color = "green";
            userInput.value = "";
            setChallengeText();
        }
    } else {
        // Incorrect answer
        messageElement.textContent = "Incorrect! Try again.";
        messageElement.style.color = "red";
    }
});

// Event listener for Restart button
restartBtn.addEventListener("click", startGame);

// Start the game when the page loads
startGame();
