const gameBoard = (() => {
  const gameState = [,,,,,,,];
  let playerTurn = "O";
  const win = 
    [0,0,0, //row 0,1,2
     0,0,0, //column 3,4,5
     0,0];  //diagonal 6,7

  const toggleTurn = () => {
    if (playerTurn == 'O') playerTurn = 'X';
    else playerTurn = 'O';
  }

  const checkWin = () => {
    if (win.includes(3) || win.includes(-3)) return true;
    else return false;
  }

  const increment = (cell) => {
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
      console.log(checkWin());
      if (checkWin()) console.log(`${playerTurn} wins!`);
    }
  }

  const getGameState = () => {
    return gameState;
  }

  const resetGame = () => {
    for (let i = 0; i < gameState.length; i++) {
      gameState[i] = null;
    }
    console.log(gameState);
    displayController.emptyGrid();
  }

  return {
    getGameState,
    makePlay,
    resetGame
  };
})();

const displayController = (() => {
  const initialize = () => {
    document.querySelectorAll('.container div').forEach( div => {
      div.addEventListener('click', e => {
        gameBoard.makePlay(parseInt(e.target.id.slice(-1)))
      })
    });
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
    emptyGrid
  };
})();

// const playerFactory = (name, symbol) => {
//   const name = name;
//   const symbol = symbol;
//   return {
//     name,
//     symbol
//   }
// }

displayController.fillGrid();
displayController.initialize();

