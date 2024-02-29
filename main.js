const boardDiv = document.querySelector('#board');
let direction = 'right';
let interval;
let snake = [[0,0], [0,1], [0,2]];
let score = 0;
const board = [
  ['','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','','']
];

document.addEventListener('keydown', (e)=>{
  if(e.key === 'ArrowUp'){
    direction = 'up';
  } else if(e.key === 'ArrowDown'){
    direction = 'down';
  } else if(e.key === 'ArrowLeft'){
    direction = 'left';
  } else if(e.key === 'ArrowRight'){
    direction = 'right';
  }
});

function render(){
  boardDiv.innerHTML = '';
  for(let row = 0; row < board.length; row++){
    for(let col = 0; col < board[row].length; col++){
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      if(board[row][col] === 'food'){
        cell.classList.add('food');
      }
      if(board[row][col] === 'snake'){
        cell.classList.add('snake');
      };
      boardDiv.appendChild(cell);
    }
  }
}

function move(){
  const oldHead = snake.shift();
  let newHead;
  if(direction === 'right') newHead = [snake[snake.length - 1][0], snake[snake.length - 1][1] + 1];
  else if(direction === 'left') newHead = [snake[snake.length - 1][0], snake[snake.length - 1][1] - 1];
  else if(direction === 'up')newHead = [snake[snake.length - 1][0] - 1, snake[snake.length - 1][1]];
  else if(direction === 'down') newHead = [snake[snake.length - 1][0] + 1, snake[snake.length - 1][1]];

  if(newHead[0] < 0 || newHead[0] >= board.length || newHead[1] < 0 || newHead[1] >= board[0].length) {
    gameOver();
    return;
  }

  if(board[oldHead[0]][oldHead[1]]) {
    board[oldHead[0]][oldHead[1]] = '';
  }

  if(board[newHead[0]][newHead[1]] === 'food') {
    snake.push(oldHead);
    randomFood();
    score++;
    document.querySelector('#score').textContent = `Score: ${score}`;
  } else if(board[newHead[0]][newHead[1]] === 'snake') {
    gameOver();
    return;
  }

  snake.push(newHead);
  board[newHead[0]][newHead[1]] = 'snake';

  render();
}

function randomFood(){
  board[Math.floor(Math.random() * board.length)][Math.floor(Math.random() * board[0].length)] = 'food';
};

function gameOver(){
  alert('Game Over');
  clearInterval(interval);
  direction = 'right';
  board.forEach(row => row.fill(''));
  snake = [[0,0], [0,1], [0,2]];

  init();
}

function init(){
  for(let i = 0; i<snake.length; i++){
    board[snake[i][0]][snake[i][1]] = 'snake';
  };
  randomFood();
  render();
  setTimeout(()=>{
    interval = setInterval(move, 300);
  }, 300);
}

init();