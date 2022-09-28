const gameBoard = () => {
  let board = [];
  let displayBoard = document.getElementById('grid');
  displayBoard.style.display = 'flex';
    for (let i = 0; i < 9; i++) {
      let eachBox = document.createElement('div');
      eachBox.setAttribute('class', 'box');
      eachBox.setAttribute('id', i);
      board.push(displayBoard.appendChild(eachBox));
    };
  return {
    board
  }
};

const createPlayer = (name, symbol) => {
  return {
    name,
    symbol
  }
};

const game = (players) => {
  let board = gameBoard().board;
  const winningCombos = [
   [0, 1, 2], [3, 4, 5], [6, 7, 8],
   [0, 3, 6], [1, 4, 7], [2, 5, 8],
   [6, 4, 2], [8, 4, 0]
  ];
  const [player1, player2] = players
  let message = document.getElementById('info');
  message.textContent =  `${player1.name}, it's your turn!`;
  let playerOnePositions = [];
  let playerTwoPositions = [];
  let playerOneWin = [];
  let playerTwoWin = [];
  let turn =  0;
  let tie = false;

  function checkWin(board) {
    for (let i = 0; i < board.length; i++) {
      if (board[i].textContent == 'X' && !playerOnePositions.includes(board[i].id)) {
        playerOnePositions.push(board[i].id);
      } else if (board[i].textContent == 'O' && !playerTwoPositions.includes(board[i].id)) {
        playerTwoPositions.push(board[i].id);
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
    let playAgain = document.createElement('button');
    playAgain.innerHTML = 'Play Again!';
    playAgain.setAttribute('id', 'playAgain');
    message.appendChild(playAgain)

    let reset = document.createElement('button');
    reset.textContent = 'Reset';
    reset.setAttribute('id', 'reset');
    message.appendChild(reset);

    reset.addEventListener('click', () => {
      window.location.reload();
    });
    
    playAgain.addEventListener('click', () => {
      let gameGrid = document.getElementById('grid')
      gameGrid.innerHTML = ""
      game(players);
    })
  };

  //listen for player click
  for(let i = 0; i<board.length; i++) {
    board[i].addEventListener('click', function(e){
      if(playerOneWin.includes(3) || playerTwoWin.includes(3)) {return resetGame()};
      if(turn <= 8) {
      if(turn % 2 == 0 && this.textContent == ''){
        this.textContent = player1.symbol
        turn++;
        checkWin(board);
        if(playerOneWin.includes(3)){ return annouceWinner(player1) }
          else{message.textContent = `${player2.name}, it's your turn!`};
      } else if(turn % 2 == 1 && this.textContent == '') {
        this.textContent = player2.symbol;
        turn++;
        checkWin(board)
        if(playerTwoWin.includes(3)){ return annouceWinner(player2) }
          else{ message.textContent = `${player1.name}, it's your turn!` };
        }
      } if(turn == 9){
        message.textContent = "Its a tie!"
        resetGame();
      }
    })
  }
  return{
    game
  }
};

const createPlayerForm = () =>{
  let formLabel = document.createElement('label')
  formLabel.setAttribute('id', 'nameLabel')
  formLabel.innerHTML = 'Player 1 name '
  let formInput = document.createElement('input')
  formInput.setAttribute('id', 'nameInput')
  let formError = document.createElement('p')
  formError.style.color = 'red'
  formError.setAttribute('id', 'formError')
  let submit = document.createElement('button')
  submit.setAttribute('id', 'submit')
  submit.innerHTML = 'Create'
  let form = document.getElementById('title')
  form.append(formLabel)
  form.append(formInput)
  form.append(formError)
  form.append(submit)
  let players = [];

  submit.addEventListener('click', (e) => {
      e.preventDefault();
      formError.innerHTML = '';
      let name = formInput.value
      let regex = /\w/;
      let symbol;
      if(players.length == 0) {
        symbol = 'X'}
      if(players.length == 1) {
        symbol = 'O'
      }
      if(name.match(regex)){
        let player = createPlayer(name, symbol)
        players.push(player)
        formInput.value = '';
        formLabel.innerHTML = 'Player 2 name ';
      }else{
        formError.innerHTML = "Please enter at least one character that hasn't been selected"
      }
      if(players.length == 2){
        form.removeChild(formLabel);
        form.removeChild(formInput);
        form.removeChild(formError);
        form.removeChild(submit);
        game(players)
      }
    })
};

const startAGame = (() => {
  let displayButton = document.getElementById('title');
  let startButton = document.createElement('button');
  startButton.innerHTML = 'Start A Game!';
  startButton.setAttribute('id', 'start');
  displayButton.appendChild(startButton);

  startButton.addEventListener('click', (e)=> {
    e.preventDefault();
    createPlayerForm();
    displayButton.removeChild(startButton);
  })
})();