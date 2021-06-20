//Enter functionality to add Player's names
  //popup for 
//responsiveness & looks
//AI


const gameBoard = (() => {
  const gameState = [,,,,,,,];
  let playerTurn = "O";
  let moveCounter = 0;
  const win = [0,0,0,0,0,0,0,0];  
  let xPlayer;
  let oPlayer;

  const assignPlayer = (player1, player2) => {
    xPlayer = player1;
    oPlayer = player2;
  } 

  const toggleTurn = () => {
    if (playerTurn == 'O') playerTurn = 'X';
    else playerTurn = 'O';
  }

  const checkWin = () => {
    if (win.includes(3) || win.includes(-3)) return 1;
    else if (moveCounter == 9) return 2;
    else return 3;
  }

  const increment = (cell) => {
    moveCounter++;
    const x = playerTurn == 'X' ? 1 : -1; 
    if (cell == 0) {
      win[0] += x;
      win[3] += x;
      win[6] += x;
    }
    else if (cell == 1) {
      win[0] += x;
      win[4] += x;
    }
    else if (cell == 2) {
      win[0] += x;
      win[5] += x;
      win[7] += x;
    }
    else if (cell == 3) {
      win[1] += x;
      win[3] += x;
    }
    else if (cell == 4) {
      win[1] += x;
      win[4] += x;
      win[6] += x;
      win[7] += x;
    }
    else if (cell == 5) {
      win[2] += x;
      win[5] += x;
    }
    else if (cell == 6) {
      win[2] += x;
      win[3] += x;
      win[7] += x;
    }
    else if (cell == 7) {
      win[2] += x;
      win[4] += x;
    }
    else if (cell == 8) {
      win[2] += x;
      win[5] += x;
      win[6] += x;
    }
  }

  const makePlay = (cell) => {
    if (gameState[cell]) {
      console.log('Tried to play on already played space');
    }
    else {
      toggleTurn();
      increment(cell);
      gameState[cell] = playerTurn;
      displayController.fillGrid();
      if (checkWin() == 1) {
        const msg = `${playerTurn} wins!`;
        displayController.endGame(msg);
      }
      else if (checkWin() == 2) {
        const msg = 'Draw!'
        displayController.endGame(msg);
      }
    }
  }

  const getGameState = () => {
    return gameState;
  }

  const startGame = () => {
    displayController.fillGrid();
    displayController.initialize();
  }

  const resetGame = () => {
    for (let i = 0; i < gameState.length; i++) {
      gameState[i] = null;
    }
    for (let i = 0; i < win.length; i++) {
      win[i] = 0;
    }
    playerTurn = 'O';
    moveCounter = 0;
    displayController.emptyGrid();
  }

  return {
    getGameState,
    makePlay,
    startGame,
    resetGame
  };
})();

const displayController = (() => {
  const initialize = () => {
    document.querySelectorAll('.board-container div').forEach( item => {
        item.addEventListener('click', e => {
          const div = e.target;
          gameBoard.makePlay(parseInt(div.id.slice(-1)));
      });
    });
  }

  const endGame = (text) => {
    console.log('ending game');
    var modal = document.getElementById('myModal');
    // Get the close button
    var btnClose = document.getElementById("closeModal");
    // Get the main container and the body
    var body = document.getElementsByTagName('body');
    var container = document.getElementById('myContainer');
    const msg = document.getElementById('msg');
    msg.textContent = text;

    // Open the modal
    modal.className = "Modal is-visuallyHidden";
    setTimeout(function() {
      container.className = "board-container is-blurred";
      modal.className = "Modal";
    }, 100);
    container.parentElement.className = "ModalOpen";

    // Close the modal
    btnClose.onclick = function() {
      gameBoard.resetGame();
      modal.className = "Modal is-hidden is-visuallyHidden";
      body.className = "";
      container.className = "board-container";
      container.parentElement.className = "";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        gameBoard.resetGame();
        modal.className = "Modal is-hidden";
        body.className = "";
        container.className = "board-container";
        container.parentElement.className = "";
      }
    }
  }

  const writeToDOM = (selector, content) => {
    document.querySelector(selector).textContent = content;
  };

  const fillGrid = () => {
    const grid = gameBoard.getGameState();
    for (let i = 0; i < grid.length; i++) {
      if (grid[i] != undefined) {
        writeToDOM(`#cell${i}`, grid[i]);
      }
    }
  };

  const emptyGrid = () => {
    const grid = gameBoard.getGameState();
    for (let i = 0; i < grid.length; i++) {
      writeToDOM(`#cell${i}`, '');
    }
  }
  return {
    fillGrid,
    initialize,
    emptyGrid,
    endGame,
  };
})();

const playerFactory = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return {
    getName,
    getSymbol
  }
}

    


