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
    
    // Show initial ad
    setTimeout(() => {
        showBannerAd();
    }, 1000);
}

// Create game board
function createBoard() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('button');
        cell.className = 'cell';
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', () => handleCellClick(i));
        gameBoard.appendChild(cell);
    }
}

// Handle cell click
function handleCellClick(index) {
    if (board[index] !== '' || !gameActive || currentPlayer !== 'X') {
        return;
    }

    makeMove(index, 'X');
    
    if (checkGameEnd()) return;
    
    // AI move
    currentPlayer = 'O';
    updateStatus();
    
    setTimeout(() => {
        makeAIMove();
    }, 500);
}

// Make a move
function makeMove(index, player) {
    board[index] = player;
    const cell = document.querySelector(`[data-index="${index}"]`);
    cell.textContent = player;
    cell.classList.add(player.toLowerCase());
    cell.disabled = true;
}

// AI move logic
function makeAIMove() {
    if (!gameActive) return;

    // Simple AI - can be improved with Minimax algorithm
    let availableCells = board.map((cell, index) => cell === '' ? index : null)
        .filter(cell => cell !== null);
    
    if (availableCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        makeMove(availableCells[randomIndex], 'O');
        checkGameEnd();
    }
    
    currentPlayer = 'X';
    updateStatus();
}

// Check game end conditions
function checkGameEnd() {
    let roundWon = false;
    let winningCombo = [];

    // Check win conditions
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
            showInterstitialAd(); // Show ad on win
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

// Highlight winning cells
function highlightWinningCells(cells) {
    cells.forEach(index => {
        const cell = document.querySelector(`[data-index="${index}"]`);
        cell.classList.add('winning-cell');
    });
}

// Update game status
function updateStatus() {
    statusDisplay.textContent = gameActive 
        ? `Current player: ${currentPlayer}`
        : 'Game over! Click New Game to play again.';
}

// Update score display
function updateScores() {
    playerScoreDisplay.textContent = scores.player;
    aiScoreDisplay.textContent = scores.ai;
}

// Reset current game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    createBoard();
    updateStatus();
}

// Start new game (reset scores too)
function newGame() {
    scores = { player: 0, ai: 0 };
    resetGame();
    updateScores();
    
    // Show ad every 3 new games
    if (scores.player % 3 === 0) {
        showInterstitialAd();
    }
}

// Event listeners
resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', newGame);

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', initGame);
