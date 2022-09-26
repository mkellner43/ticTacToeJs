const Player = (() => {
  return {
    FIRST: 1,
    SECOND: 2,
    NONE: 0
  }
})();

const GameBoard = (() => {
  const gridElement = document.getElementById("grid");
  let gameBoard = [];

  const init = function () {
    let counter = 0;
    for (let i = 0; i < 9; i++) {
      const gridCell = document.createElement('div');
      const img = document.createElement('img')
      gridCell.appendChild(img);
      gridCell.id = `grid-${counter}`;
      gridCell.dataset.player = '';
      counter++;
      gameBoard.push(gridCell);
      gridElement.appendChild(gridCell);
    }
  };

  const reset = function() {
    gameBoard.forEach(cell => {
      cell.dataset.player = '';
      cell.removeChild(cell.firstChild);
      const img = document.createElement('img');
      cell.appendChild('img');
    })
  }
  return {
    gridElement: gridElement,
    gameBoard,
    init,
    reset
  }
})();

function playerFactory(name, icon) {
  const play = function (e) {
    if (e.target.nodeName.toLowercase() === 'div') {
      const img = e.target.querySelector('img');
      if(img.src.length === 0) {
        img.src = icon;
        return true;
        }
      } else if (e.target.nodeName.toLowercase() === 'img') {
        return false;
      }
    }
    return {
      play,
      name,
      icon
    }
};

const Game = (() => {
  let turn = Player.FIRST
  const totalRounds = 8;
  let round = 0;
  let player1 = playerFactory('player 1', 'X')
  let player2 = playerFactory('player 2', 'O')
  GameBoard.init(player1, player2, round)
  let gameBoard = GameBoard.gameBoard;

  function play(e) {
    if (round === totalRounds) {
      console.log("yay");
      //watch video and try yourself after watching see we can grasp concepts
    }
  }
});

