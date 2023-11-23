// Your code here.
  document.getElementById('submit').addEventListener('click', startGame);

  function startGame() {
    const player1Name = document.getElementById('player-1').value;
    const player2Name = document.getElementById('player-2').value;

    if (player1Name && player2Name) {
      document.getElementById('player-inputs').style.display = 'none';
      document.getElementById('game-container').style.display = 'block';

      initializeGame(player1Name, player2Name);
    } else {
      alert('Please enter names for both players.');
    }
  }

  function initializeGame(player1Name, player2Name) {
    const board = document.getElementById('board');
    const message = document.querySelector('.message');

    let currentPlayer = 1;
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let isDragging = false;
    let draggedCellIndex;

    // Create cells and add event listeners
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.id = i + 1;
      cell.addEventListener('mousedown', (e) => cellMouseDown(e, i));
      cell.addEventListener('mousemove', (e) => cellMouseMove(e, i));
      cell.addEventListener('mouseup', () => cellMouseUp());
      board.appendChild(cell);
    }

    // Function to handle cell mouse down
    function cellMouseDown(event, index) {
      event.preventDefault();
      isDragging = true;
      draggedCellIndex = index;
      document.getElementById(index + 1).style.cursor = 'grabbing';
    }

    // Function to handle cell mouse move
    function cellMouseMove(event, index) {
      if (isDragging && draggedCellIndex !== undefined) {
        event.preventDefault();
        if (Math.abs(draggedCellIndex - index) === 1 || Math.abs(draggedCellIndex - index) === 3) {
          swapCells(draggedCellIndex, index);
        }
      }
    }

    // Function to handle cell mouse up
    function cellMouseUp() {
      isDragging = false;
      draggedCellIndex = undefined;
      document.querySelectorAll('.cell').forEach(cell => {
        cell.style.cursor = 'grab';
      });
    }

    // Function to swap cells
    function swapCells(index1, index2) {
      const temp = boardState[index1];
      boardState[index1] = boardState[index2];
      boardState[index2] = temp;

      document.getElementById(index1 + 1).textContent = boardState[index1];
      document.getElementById(index2 + 1).textContent = boardState[index2];
    }

    // Initial message
    message.textContent = `${player1Name}, you're up!`;
  }