// Initialize Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();

// Game state
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let scores = { player: 0, ai: 0 };

// DOM elements
const gameBoard = document.getElementById('game-board');
const statusDisplay = document.getElementById('status');
const playerScoreDisplay = document.getElementById('player-score');
const aiScoreDisplay = document.getElementById('ai-score');
const resetBtn = document.getElementById('reset-btn');
const newGameBtn = document.getElementById('new-game-btn');

// Winning combinations
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

// Initialize game
function initGame() {
    createBoard();
    updateStatus();
    updateScores();
    
    // Banner ads akan auto show via LibTL
    console.log('Game initialized - Ads should auto display');
}

// ... (REST OF YOUR GAME CODE REMAINS THE SAME - createBoard, handleCellClick, makeMove, etc) ...

// Check game end conditions - UPDATE INTERSTITIAL TRIGGER
function checkGameEnd() {
    let roundWon = false;
    let winningCombo = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            winningCombo = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        highlightWinningCells(winningCombo);
        
        if (currentPlayer === 'X') {
            scores.player++;
            statusDisplay.textContent = 'You win! 🎉';
            // Trigger interstitial on win
            setTimeout(() => {
                if (window.showInterstitialAd) {
                    window.showInterstitialAd();
                }
            }, 1500);
        } else {
            scores.ai++;
            statusDisplay.textContent = 'AI wins! 🤖';
        }
        
        updateScores();
        return true;
    }

    // Check draw
    if (!board.includes('')) {
        gameActive = false;
        statusDisplay.textContent = 'Game ended in a draw! 🤝';
        return true;
    }

    return false;
}

// ... (REST OF YOUR GAME CODE REMAINS THE SAME) ...

// Event listeners
resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', newGame);

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', initGame);
