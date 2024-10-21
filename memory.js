// Step 1: Create an array containing pairs of card values
const cardValues = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"];

// Step 2: Shuffle the array randomly
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Variables to hold the game state
let shuffledCards = [];
let revealedCards = [];
let firstCardIndex = null;
let secondCardIndex = null;

// Initialize the game
function initGame() {
    shuffledCards = shuffle([...cardValues]);
    revealedCards = Array(shuffledCards.length).fill(false);
    firstCardIndex = null;
    secondCardIndex = null;
    displayBoard();
}

// Function to display the game board
function displayBoard() {
    const gameBoard = document.getElementById('memorycard');
    gameBoard.innerHTML = ''; // Clear the board
    
    shuffledCards.forEach((value, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.textContent = revealedCards[index] ? value : '?';
        
        if (revealedCards[index]) {
            cardElement.classList.add('matched');
        } else {
            cardElement.addEventListener('click', () => handleCardClick(index));
        }

        gameBoard.appendChild(cardElement);
    });
}

// Function to handle card click
function handleCardClick(index) {
    if (revealedCards[index] || firstCardIndex === index || secondCardIndex === index) return;

    if (firstCardIndex === null) {
        firstCardIndex = index;
        revealedCards[index] = true;
    } else if (secondCardIndex === null) {
        secondCardIndex = index;
        revealedCards[index] = true;
        checkMatch();
    }

    displayBoard();
}

// Function to check if the selected cards match
function checkMatch() {
    if (shuffledCards[firstCardIndex] === shuffledCards[secondCardIndex]) {
        // If cards match, keep them revealed
        resetSelection();
        checkGameOver();
    } else {
        // If cards don't match, hide them again after a short delay
        setTimeout(() => {
            revealedCards[firstCardIndex] = false;
            revealedCards[secondCardIndex] = false;
            resetSelection();
            displayBoard();
        }, 1000);
    }
}

// Function to reset the selection
function resetSelection() {
    firstCardIndex = null;
    secondCardIndex = null;
}

// Function to check if the game is over
function checkGameOver() {
    if (revealedCards.every(Boolean)) {
        alert('Congratulations! You matched all the cards!');
    }
}

// Event listener for the "Refresh" button to restart the game
document.getElementById('refresh').addEventListener('click', initGame);

// Initialize the game on page load
initGame();
