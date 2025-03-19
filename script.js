'use strict';

/** Selecting elements */
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1'); // Fixed incorrect ID reference
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Initializing scores to zero
score0El.textContent = 0;
score1El.textContent = 0;

// Hide the dice at the start
diceEl.classList.add('hidden');

// Declaring game variables
let scores, currentScore, activePlayer, playing;

/**
 * Initializes the game state by resetting scores, current player, and UI elements.
 */
const init = function () {
    scores = [0, 0]; // Stores the total scores of each player
    currentScore = 0; // Stores the current round score
    activePlayer = 0; // Tracks which player's turn it is (0 or 1)
    playing = true; // Boolean to track if game is active
    
    // Reset UI elements
    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add('hidden');
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
};

init();

/**
 * Switches the active player when the current player rolls a 1 or holds.
 */
const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

/**
 * Handles dice roll event.
 * Generates a random number between 1 and 6, updates the UI, and switches player if necessary.
 */
btnRoll.addEventListener('click', function() {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        
        // Display dice
        diceEl.src = `images/dice-${dice}.png`;
        diceEl.classList.remove('hidden');
        
        // Check for rolled 1
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

/**
 * Handles hold button event.
 * Updates the score of the active player and checks if they have won the game.
 */
btnHold.addEventListener('click', function() {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        
        // Check if player wins
        if (scores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
});

/**
 * Resets the game when the "New Game" button is clicked.
 */
btnNew.addEventListener('click', function() {
    init();
});