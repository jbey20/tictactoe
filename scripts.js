//hide player names after start game and unhide when game over
//banner saying who's turn it is
//After a game is over, change color of buttons based on playing or not?)
//AI
  //make harder version.


const gameBoard = (() => {
  const gameState = [0,1,2,3,4,5,6,7,8];
  let moveCounter = 0;
  const win = [0,0,0,0,0,0,0,0];  
  let xPlayer;
  let oPlayer;
  let playerTurn;

  const getPlayerTurn = () => {
    return playerTurn;
  };

  const emptyIndexies = (board) => {
    return board.filter(s => s!= 'O' && s != 'X');
  };

  const winning = (board, player) => {
    if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
    ) {
    console.log(true);
    return true;
    } else {
    console.log(false);
    return false;
    }
   }

  const minimax = (board, player) => {
    let newBoard = [...board];
    const availSpots = emptyIndexies(newBoard);
    //base cases
    if (winning(newBoard, xPlayer.getSymbol())) {
      console.log(-10);
      return {score: -10};
    }
    else if (winning(newBoard, oPlayer.getSymbol())) {
      console.log(10);
      return {score: 10};
    }
    else if (availSpots.length === 0) {
      console.log(0);
      return {score: 0};
    };

    //recursive call to minimax
    let moves = [];
    for (let i = 0; i < availSpots.length; i++) {
      let move = {};
      move.index = newBoard[availSpots[i]];
      newBoard[availSpots[i]] = player.getSymbol();
      console.log(newBoard);
      if (player == xPlayer) {
        let result = minimax(newBoard, oPlayer);
        move.score = result.score;
      }
      else {
        let result = minimax(newBoard, xPlayer);
        move.score = result.score;
      }
      newBoard[availSpots[i]] = move.index;
      moves.push(move);
    }

    //determine best moves
    let bestMove;
    if (player == xPlayer) {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  };

  const assignPlayer = (playerX, playerO) => {
    xPlayer = playerX;
    oPlayer = playerO;
    playerTurn = oPlayer;
  };

  const getPlayers = () => {
    return [xPlayer, oPlayer];
  };

  const getMoveCounter = () => {
    return moveCounter;
  }

  const toggleTurn = () => {
    if (playerTurn == oPlayer) playerTurn = xPlayer;
    else playerTurn = oPlayer;
  };

  const checkWin = () => {
    if (win.includes(3) || win.includes(-3)) {
      AI.stop();
      return 1;
    }
    else if (moveCounter == 9) return 2;
    else return 3;
  };

  const increment = (cell) => {
    moveCounter++;
    const x = playerTurn.getSymbol() == 'X' ? 1 : -1; 
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
      win[1] += x;
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
  };

  const makePlay = (cell) => {
    if (checkWin() == '2') {
      const msg = 'Draw!'
      displayController.endGame(msg);
      return 'draw';
    }
    if (gameState[cell] == 'X' || gameState[cell] == 'O') {
      console.log('Tried to play on already played space');
      return 'invalid';
    }
    else {
      toggleTurn();
      increment(cell);
      gameState[cell] = playerTurn.getSymbol();
      displayController.fillGrid();
      if (checkWin() == 1) {
        const msg = `${playerTurn.getName()} wins!`;
        displayController.endGame(msg);
        //const players = gameBoard.getPlayers();
        // if (playerTurn == 'X') {
        //   const msg = `${playerTurn.getName()} wins!`;
        //   displayController.endGame(msg);
        // }
        // else {
        //   console.log(`${playerTurn}. We got here.`)
        //   const msg = `${players[1]} wins!`;
        //   displayController.endGame(msg);
        // }
        return 'win';
      }
      else if (checkWin() == 2) {
        const msg = 'Draw!'
        displayController.endGame(msg);
        return 'draw';
      }
      else return 'continue';
    }
  };

  const getGameState = () => {
    return gameState;
  };

  const startGame = () => {
    displayController.fillGrid();
    displayController.initialize();
    const isAI = displayController.readPlayers();
    if (isAI != 'none') {
      if (isAI == 'O') {
        AI.play()
      }
      else {
        AI.AImove();
        AI.play();
      };
    }
  };

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
    displayController.deinitialize();
  };

  return {
    getGameState,
    makePlay,
    startGame,
    resetGame,
    assignPlayer,
    getPlayers, 
    getPlayerTurn,
    getMoveCounter,
    minimax
  };
})();

const displayController = (() => {
  const createDivListeners = (e) => {
    const div = e.target;
        gameBoard.makePlay(parseInt(div.id.slice(-1)));
  };

  const initialize = () => {  
    document.querySelectorAll('.board-container div').forEach( item => {
        item.addEventListener('click', createDivListeners);
    });
  };

  const deinitialize = () => {
    document.querySelectorAll('.board-container div').forEach( item => {
      item.removeEventListener('click', createDivListeners);
    });
  };

  const selectPlayers = () => {
    const dropdown = document.querySelector('#mode');
    dropdown.addEventListener('change', e => {
      const mode1 = document.querySelectorAll('.one-player-input');
      const mode2 = document.querySelectorAll('.two-player-input');
      
      if (e.target.value == '1') {
        mode2.forEach(item => {
          item.classList.add('hidden-player-input')
        });
        mode1.forEach(item => {
          item.classList.remove('hidden-player-input');
        });
      }
      else {
        mode1.forEach(item => {
          item.classList.add('hidden-player-input')
        });
        mode2.forEach(item => {
          item.classList.remove('hidden-player-input');
        });
      };
    });
  };

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
  };

  const writeToDOM = (selector, content) => {
    document.querySelector(selector).textContent = content;
  };

  const fillGrid = () => {
    const grid = gameBoard.getGameState();
    for (let i = 0; i < grid.length; i++) {
      if (grid[i] == 'X' || grid[i] == 'O') {
        writeToDOM(`#cell${i}`, grid[i]);
      }
    }
  };

  const emptyGrid = () => {
    const grid = gameBoard.getGameState();
    for (let i = 0; i < grid.length; i++) {
      writeToDOM(`#cell${i}`, '');
    }
  };

  const readPlayers = () => {
    const mode = document.querySelector('#mode');

    if (mode.value == 2) {
      const xPlayer = document.querySelector('#playerX').value;
      const oPlayer = document.querySelector('#playerO').value;
      gameBoard.assignPlayer(
        playerFactory(xPlayer, 'X'),
        playerFactory(oPlayer, 'O')
      );
      return 'none';
    }
    else {
      const symbol = document.querySelector('#XorO').value;
      const playerName = document.querySelector('#playerName').value;
      let AI = '';
      if (symbol == 'X') {
        gameBoard.assignPlayer(playerFactory(playerName, 'X'), playerFactory('WOPR', 'O'));
        AI = 'O';
      }
      else {
        gameBoard.assignPlayer(playerFactory('WOPR', 'X'), playerFactory(playerName, 'O'));
        AI = 'X'
      }
      return AI;
    };    
  };

  return {
    fillGrid,
    initialize,
    deinitialize,
    emptyGrid,
    endGame,
    readPlayers,
    selectPlayers
  };
})();

const AI = (() => {
  const AImove = () => {
    // const getRandomCell = () => {
    //   min = Math.ceil(0);
    //   max = Math.floor(9);
    //   const cell = Math.floor(Math.random() * (max - min) + min);
    //   console.log(cell);
    //   return cell;
    // }; 
    // let reply = gameBoard.makePlay(getRandomCell());
    // while (reply == 'invalid') {
    //   console.log(reply);
    //   reply = gameBoard.makePlay(getRandomCell());
    // };
    const move = gameBoard.minimax(gameBoard.getGameState(), gameBoard.getPlayerTurn())
    const reply = gameBoard.makePlay(move);
    
    if (reply == 'win' || reply == 'draw') {
      AI.stop();
    };

  };
  
  const play = (mode) => {
    document.querySelectorAll('.board-container div').forEach( item => {
      item.addEventListener('click', AImove);
    });
  };

  const stop = () => {
    document.querySelectorAll('.board-container div').forEach( item => {
      item.removeEventListener('click', AImove);
    });
  };

  return {
    play,
    stop,
    AImove
  };
})();

const playerFactory = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return {
    getName,
    getSymbol
  };
}


displayController.selectPlayers();
    


