const gameBoard = (() => {
  const gameState = ['X','O',,,,'X',,'O'];
  const makePlay = () => {

  }

  const getGameState = () => {
    return gameState;
  }
  return {
    getGameState,
  };
})();

const displayController = (() => {
  // const initialize = () => {
  //   document.querySelectorAll('.container div').forEach( div => {
  //     div.addEventListener('click', fillGrid(e))
  //   });
  // }
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
  return {
    fillGrid,
  };
})();

const playerFactory = (name) => {

  return {
    
  }
}

displayController.fillGrid();