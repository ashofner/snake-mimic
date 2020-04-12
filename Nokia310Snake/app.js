//based on https://www.freecodecamp.org/news/learn-javascript-by-building-7-games-video-course/
document.addEventListener('DOMContentLoaded', () =>{
  const squares = document.querySelectorAll('.grid div');
  const scoreHolder = document.querySelector('#score');
  const startBtn = document.querySelector('.start');

  const width = 10;
  let currentIndex = 0;
  let appleIndex = 0;
  let currentSnake = [2, 1, 1]; //2 being head
  let direction = 1;
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;

  function randomApple(){
    squares[appleIndex].classList.remove('apple');
    appleIndex = Math.floor(Math.random() * squares.length);
    if(!squares[appleIndex].classList.contains('snake'))
    {
      squares[appleIndex].classList.add('apple');
    } else {
      {
        randomApple();
      }
    }
  }

  //to start and Restart
  function startGame(){
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(interval);
    score = 0;
    randomApple();
    direction = 1;
    scoreHolder.innerText = score;
    intervalTime = 1000;
    speed = 0.9;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    interval = setInterval(moveOutcomes, intervalTime);
  }

  //check function
  function moveOutcomes(){
    if( //hit something not the apple
      (currentSnake[0] + width >= (width * width) && direction === width) || //down
      (currentSnake[0] - width < 0 && direction === -width) || //up
      ((currentSnake[0] % width === (width - 1)) && direction === 1) || //right
      ((currentSnake[0] % width === 0) && direction === -1) || //left
      (squares[currentSnake[0] - 0 + direction].classList.contains('snake')) //hit itself
    ){
      //Game Over
      alert("Game over");
      return clearInterval(interval);
    }
    currentSnake.unshift(currentSnake[0]+direction); //gives direction
    squares[currentSnake[0]].classList.add('snake');
    if(!squares[currentSnake[0]].classList.contains('apple')){
      //remove tail leave apple where it is
      const tail = currentSnake.pop();
      squares[tail].classList.remove('snake');
    }else {
      //keep tail and move apple
      randomApple();
      score++;
      scoreHolder.textContent = score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcomes, intervalTime);
    }

  }


  function control(e){
    squares[currentIndex].classList.remove('snake'); //
    if(e.keyCode === 39){//right
      direction = 1;
    } else if(e.keyCode === 38){
      direction = -width; //up
    } else if(e.keyCode === 37){//left
      direction = -1;
    } else if(e.keyCode === 40){//down
      direction = +width;
    }

  }

  document.addEventListener('keyup', control);
  startBtn.addEventListener('click', startGame); //know it is for that button? 41:46
})
