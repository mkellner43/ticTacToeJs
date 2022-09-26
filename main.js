const gameBoard = ( () => {
  let gameBoard = [];
  const createBoard = function () {
    let board = document.getElementById('grid')
    for(let i = 0; i<9; i++){
      let eachBox = document.createElement('div')
      eachBox.setAttribute('class', 'box')
      eachBox.setAttribute('id', i)

    gameBoard.push(board.appendChild(eachBox))
    }
  }
  return {
    createBoard
  }
})();

const createPlayer = (name, symbol) => {
  return {
    name,
    symbol
  }
};

const game = (() => {
  let board = gameBoard.createBoard();
  const winningCombos = [
   [0, 1, 2], [3, 4, 5], [6, 7, 8],
   [0, 3, 6], [1, 4, 7], [2, 5, 8],
   [6, 4, 2], [8, 4, 0]
  ];
  let player1 = createPlayer('player 1', 'X');
  let player2 = createPlayer('player2', 'O');
  let options = Array.from(document.querySelectorAll('.box'));
  let message = document.getElementById('info');
  message.textContent = "Player 1 it's your turn!";
  let playerOnePositions = [];
  let playerTwoPositions = [];
  let playerOneWin = [];
  let playerTwoWin = [];
  let turn =  0;
  let tie = false;


  function checkWin(options) {
    for (let i = 0; i < options.length; i++) {
      if (options[i].textContent == 'X' && !playerOnePositions.includes(options[i].id)) {
        playerOnePositions.push(options[i].id);
      } else if (options[i].textContent == 'O' && !playerTwoPositions.includes(options[i].id)) {
        playerTwoPositions.push(options[i].id);
      }
    }
    winningCombos.forEach((combo) => {
      let playerOneScore = 0;
      let playerTwoScore = 0;
      for(let i = 0; i < combo.length; i++){
        let num = combo[i].toString();
        if (playerOnePositions.includes(num)) {
          playerOneScore++;
        } else if (playerTwoPositions.includes(num)){
          playerTwoScore++;
        }
      }
      playerOneWin.push(playerOneScore);
      playerTwoWin.push(playerTwoScore);
    });
  }
  function annouceWinner(player) {
    message.textContent =`${player.name} wins!`;
    return resetGame();
  }

  function resetGame() {
    let getResetBtn = document.getElementById('reset')
    if(getResetBtn == null){
      let resetBtn = document.createElement('button');
      resetBtn.textContent = 'Play again!';
      resetBtn.setAttribute('id', 'reset')
      message.appendChild(resetBtn);
      reset();
    } else { return };
  }
  //listen for player click
  for(let i = 0; i<options.length; i++) {
    options[i].addEventListener('click', function(e){
      if(playerOneWin.includes(3) || playerTwoWin.includes(3)) {return resetGame()};
      if(turn <= 8) {
      if(turn % 2 == 0 && this.textContent == ''){
        this.textContent = player1.symbol
        turn++;
        checkWin(options);
        if(playerOneWin.includes(3)){ return annouceWinner(player1) }
          else{message.textContent = "Player 2 its your turn!"};
      } else if(turn % 2 == 1 && this.textContent == '') {
        this.textContent = player2.symbol;
        turn++;
        checkWin(options)
        if(playerTwoWin.includes(3)){ return annouceWinner(player2) }
          else{ message.textContent = "Player 1 its your turn!" };
        }
      } if(turn == 9){
        message.textContent = "Its a tie!"
        resetGame();
      }
    })
  }

  function reset(){
    let reset = document.getElementById('reset')
    reset.addEventListener('click', function(e) {
    window.location.reload();
    });
  }

})();