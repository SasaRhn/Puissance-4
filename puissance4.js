let ROWS;
let COLS;
const EMPTY = 0;
const PLAYER1 = 1;
const PLAYER2 = 2;
const grid = [];
let currentPlayer = PLAYER1;
const winSoundPlayer1 = new Audio('winblue.mp3');
const winSoundPlayer2 = new Audio('winred.mp3');

function initializeGame(rows, cols) {
  ROWS = rows;
  COLS = cols;

  for (let row = 0; row < ROWS; row++) {
    grid[row] = new Array(COLS).fill(EMPTY);
  }

  displayGrid();
}

function makeMove(column) {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (grid[row][column] === EMPTY) {
      grid[row][column] = currentPlayer;
      return { row, column };
    }
  }
  return null;
}

window.addEventListener('load', startGame);
function makeMove(column) {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (grid[row][column] === EMPTY) {
      grid[row][column] = currentPlayer;
      return { row, column };
    }
  }
  return null;
}
function checkWin(row, col) {
  const player = grid[row][col];
  let count = 0;
  for (let c = 0; c < COLS; c++) {
    if (grid[row][c] === player) {
      count++;
      if (count === 4) {
        if (player === PLAYER1) {
          winSoundPlayer1.play();
        } else if (player === PLAYER2) {
          winSoundPlayer2.play();
        }
        return true;
      }
    } else {
      count = 0;
    }
  }
  count = 0;
  for (let r = 0; r < ROWS; r++) {
    if (grid[r][col] === player) {
      count++;
      if (count === 4) {
        return true;
      }
    } else {
      count = 0;
    }
  }
  count = 0;
  let startRow = row - Math.min(row, col);
  let startCol = col - Math.min(row, col);
  while (startRow < ROWS && startCol < COLS) {
    if (grid[startRow][startCol] === player) {
      count++;
      if (count === 4) {
        return true;
      }
    } else {
      count = 0;
    }
    startRow++;
    startCol++;
  }
  count = 0;
  startRow = row + Math.min(ROWS - 1 - row, col);
  startCol = col - Math.min(ROWS - 1 - row, col);
  while (startRow >= 0 && startCol < COLS) {
    if (grid[startRow][startCol] === player) {
      count++;
      if (count === 4) {
        return true;
      }
    } else {
      count = 0;
    }
    startRow--;
    startCol++;
  }

  return false;
}
function displayGrid() {
  const container = document.getElementById("grid-container");
  container.innerHTML = "";

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      const cellElement = document.createElement("div");
      cellElement.className = "cell";
      cellElement.id = `cell-${row}-${col}`;
      cellElement.textContent = "";
      cellElement.classList.add(`player${cell}`);
      container.appendChild(cellElement);
    }
  }

  attachEventListeners();
}

function animateDrop(row, column) {
  const cellElement = document.getElementById(`cell-${row}-${column}`);
  const soundElement = currentPlayer === PLAYER1 ? document.getElementById("redSound") : document.getElementById("blueSound");

  soundElement.play();
  cellElement.style.transform = "translateY(-100px)";
  setTimeout(() => {
    cellElement.style.transform = "translateY(0)";
    soundElement.pause();
    soundElement.currentTime = 0;
  }, 200);
}


function attachEventListeners() {
  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    const column = i % COLS;
    cells[i].addEventListener("click", () => {
      const move = makeMove(column);
      if (move !== null) {
        animateDrop(move.row, move.column);
        displayGrid();

        if (checkWin(move.row, move.column)) {
          displayGrid();
          alert(`Joueur ${currentPlayer} a gagné !`);
        } else if (grid.flat().every(cell => cell !== EMPTY)) {
          displayGrid();
          alert("Match nul !");
        }

        currentPlayer = currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;
      }
    });
  }
}

function resetGame() {
  for (let row = 0; row < ROWS; row++) {
    grid[row].fill(EMPTY);
  }
  currentPlayer = PLAYER1;
  displayGrid();
}

displayGrid();