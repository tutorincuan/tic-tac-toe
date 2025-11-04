// Initialize Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();

// Game state
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let scores = { player: 0, ai: 0 };
let gamesPlayed = 0;

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
    
    // Show initial ad after short delay
    setTimeout(() => {
        showBannerAd();
    }, 1500);
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
    }, 800); // Delay untuk kesan AI "berpikir"
}

// Make a move
function makeMove(index, player) {
    board[index] = player;
    const cell = document.querySelector(`[data-index="${index}"]`);
    cell.textContent = player;
    cell.classList.add(player.toLowerCase());
    cell.disabled = true;
}

// AI move logic - Improved dengan strategi sederhana
function makeAIMove() {
    if (!gameActive) return;

    let move = findWinningMove('O') || // Coba menang
               findWinningMove('X') || // Coba blokir player
               findBestMove();         // Move strategis

    if (move !== null) {
        makeMove(move, 'O');
        checkGameEnd();
    }
    
    currentPlayer = 'X';
    updateStatus();
}

// Cari move untuk menang
function findWinningMove(player) {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        const cells = [board[a], board[b], board[c]];
        
        // Jika 2 cell sudah diisi player dan 1 kosong
        if (cells.filter(cell => cell === player).length === 2) {
            const emptyIndex = condition.findIndex(index => board[index] === '');
            if (emptyIndex !== -1 && board[condition[emptyIndex]] === '') {
                return condition[emptyIndex];
            }
        }
    }
    return null;
}

// Cari best move (prioritaskan center, lalu corners)
function findBestMove() {
    // Prioritaskan center
    if (board[4] === '') return 4;
    
    // Lalu corners
    const corners = [0, 2, 6, 8];
    const emptyCorners = corners.filter(index => board[index] === '');
    if (emptyCorners.length > 0) {
        return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
    }
    
    // Terakhir edges manapun yang available
    const edges = [1, 3, 5, 7];
    const emptyEdges = edges.filter(index => board[index] === '');
    if (emptyEdges.length > 0) {
        return emptyEdges[Math.floor(Math.random() * emptyEdges.length)];
    }
    
    return null;
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
        gamesPlayed++;
        highlightWinningCells(winningCombo);
        
        if (currentPlayer === 'X') {
            scores.player++;
            statusDisplay.textContent = 'You win! 🎉';
            // Show interstitial setiap kemenangan player
            showInterstitialAd();
        } else {
            scores.ai++;
            statusDisplay.textContent = 'AI wins! 🤖';
            // Show interstitial setiap 2 kekalahan
            if (scores.ai % 2 === 0) {
                showInterstitialAd();
            }
        }
        
        updateScores();
        return true;
    }

    // Check draw
    if (!board.includes('')) {
        gameActive = false;
        gamesPlayed++;
        statusDisplay.textContent = 'Game ended in a draw! 🤝';
        
        // Show interstitial setiap 3 draw games
        if (gamesPlayed % 3 === 0) {
            showInterstitialAd();
        }
        
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
    if (!gameActive) {
        statusDisplay.textContent = 'Game over! Click New Game to play again.';
        return;
    }
    
    statusDisplay.textContent = currentPlayer === 'X' 
        ? 'Your turn! ✨' 
        : 'AI is thinking... 🤔';
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
    
    // Remove winning highlights
    document.querySelectorAll('.winning-cell').forEach(cell => {
        cell.classList.remove('winning-cell');
    });
}

// Start new game (reset scores too)
function newGame() {
    scores = { player: 0, ai: 0 };
    gamesPlayed = 0;
    resetGame();
    updateScores();
    
    // Show interstitial setiap new game session
    showInterstitialAd();
}

// Add some sound effects (optional)
function playSound(type) {
    // Bisa ditambah sound effects nanti
    console.log('Play sound:', type);
}

// Event listeners
resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', newGame);

// Keyboard support untuk accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') {
        resetGame();
    } else if (e.key === 'n' || e.key === 'N') {
        newGame();
    }
});

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', initGame);

// Handle visibility change - pause game jika tab tidak aktif
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Game paused - tab not active');
    }
});
