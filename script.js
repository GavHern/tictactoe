// Get elements
var TABLE = document.getElementsByTagName('table')[0];
var TD = document.getElementsByTagName('td');

// Function that returns if a number is even or not
function isEven(data){
  if(data % 2 == 0){
    return true;
  } else {
    return false;
  }
}

// Creates a checkerboard for any length or width
function makeBoard(r, c){
  TABLE.innerHTML = '';
  for(let rowNum = 0; rowNum < r; rowNum++){
    TABLE.appendChild(document.createElement("tr"));

    for(let colNum = 0; colNum < c; colNum++){
      let tempCol = document.getElementsByTagName('tr')[rowNum].appendChild(document.createElement("td"));
      if(isEven(rowNum) && isEven(colNum)){
        tempCol.className = "black";
      } else if(isEven(rowNum) && !isEven(colNum)){
        tempCol.className = "white";
      } else if(!isEven(rowNum) && !isEven(colNum)){
        tempCol.className = "black";
      } else if(!isEven(rowNum) && isEven(colNum)){
        tempCol.className = "white";
      }
    }
  }
}

function replay(){
  document.getElementById('playbutton').classList.add('fall1');
  document.getElementById('winningplayer').classList.add('fall2');
  setTimeout(function(){
    document.getElementById('playbutton').style.visibility = 'hidden';
    document.getElementById('winningplayer').style.visibility = 'hidden';
  }, 900);
  setTimeout(function(){
    document.getElementsByClassName('winscreen')[0].classList.remove('winscreenanimation');
    document.getElementById('playbutton').classList.remove('fall1');
    document.getElementById('winningplayer').classList.remove('fall2');
  }, 1000);
  setTimeout(function(){
    document.getElementById('tint').style.opacity = '0';
    document.getElementById('tint').style.top = '150vh';
  }, 750);

  //Try to get the table to leave to the top and enter from the bottom.

  TABLE.style.transition = 'transform 1s';

  TABLE.style.transform = 'translate(-50%, -50%) translateX(-100vw)';

  setTimeout(function(){
    TABLE.innerHTML = '';
    runGame();
    
    TABLE.style.transform = 'translate(-50%, -50%) translateX(0vw)';
  }, 500);
}

function winner(player, indexOne, indexTwo, indexThree){
  for (let i = 0; i < TD.length; i++){
    if(TD[i].innerHTML == ''){
      TD[i].outerHTML = TD[i].outerHTML;
    }
    TD[i].style.background = "";
  }

  var timeoutTime;

  if(player != 'tie'){
    setTimeout(function(){
      for (let e = 0; e < 3; e++){
        if (e == 0){
          TD[indexOne].getElementsByTagName('img')[0].classList.add('winner', 'win3');
        } else if (e == 1){
          TD[indexTwo].getElementsByTagName('img')[0].classList.add('winner', 'win2');
        } else if (e == 2){
          TD[indexThree].getElementsByTagName('img')[0].classList.add('winner', 'win1');
        }
      }
    }, 300);

    timeoutTime = 1750;
  } else {
    timeoutTime = 300;
  }

  document.getElementById('tint').style.display = 'block';

  document.getElementById('playbutton').style.visibility = 'visible';
  document.getElementById('winningplayer').style.visibility = 'visible';
  
  setTimeout(function(){
    document.getElementById('tint').style.opacity = '100';
    document.getElementById('tint').style.top = '0vh';
    setTimeout(function(){
      if(player == 'x'){
        document.getElementById('winningplayer').innerHTML = '<span class="x">X</span> wins!';
      } else if(player == 'o'){
        document.getElementById('winningplayer').innerHTML = '<span class="o">O</span> wins!';
      } else {
        document.getElementById('winningplayer').innerHTML = '<span class="draw">Draw!</span>';
      }
      document.getElementsByClassName('winscreen')[0].classList.add('winscreenanimation');
    }, 300);
  }, timeoutTime);
}

function checkStatus(one, two, three){
  if(loggedMoves[one] == 'x' && loggedMoves[two] == 'x' && loggedMoves[three] == 'x'){
    return 'x';
  } else if(loggedMoves[one] == 'o' && loggedMoves[two] == 'o' && loggedMoves[three] == 'o') {
    return 'o';
  } else {
    return '-';
  }
}

function checkWin(){
  if(checkStatus(0, 1, 2) == 'x'){
    winner('x', 0, 1, 2);
  } else if(checkStatus(3, 4, 5) == 'x'){
    winner('x', 3, 4, 5);
  } else if(checkStatus(6, 7, 8) == 'x'){
    winner('x', 6, 7, 8);
  } else if(checkStatus(0, 3, 6) == 'x'){
    winner('x', 0, 3, 6);
  } else if(checkStatus(1, 4, 7) == 'x'){
    winner('x', 1, 4, 7);
  } else if(checkStatus(2, 5, 8) == 'x'){
    winner('x', 2, 5, 8);
  } else if(checkStatus(0, 4, 8) == 'x'){
    winner('x', 0, 4, 8);
  } else if(checkStatus(2, 4, 6) == 'x'){
    winner('x', 2, 4, 6);
  } else if(checkStatus(0, 1, 2) == 'o'){
    winner('o', 0, 1, 2);
  } else if(checkStatus(3, 4, 5) == 'o'){
    winner('o', 3, 4, 5);
  } else if(checkStatus(6, 7, 8) == 'o'){
    winner('o', 6, 7, 8);
  } else if(checkStatus(0, 3, 6) == 'o'){
    winner('o', 0, 3, 6);
  } else if(checkStatus(1, 4, 7) == 'o'){
    winner('o', 1, 4, 7);
  } else if(checkStatus(2, 5, 8) == 'o'){
    winner('o', 2, 5, 8);
  } else if(checkStatus(0, 4, 8) == 'o'){
    winner('o', 0, 4, 8);
  } else if(checkStatus(2, 4, 6) == 'o'){
    winner('o', 2, 4, 6);
  } else if(!loggedMoves.includes('-')){
    winner('tie', null, null, null);
  }
  
  /*
  [0, 1, 2]
  [3, 4, 5]
  [6, 7, 8]
  [0, 3, 6]
  [1, 4, 7]
  [2, 5, 8]
  [0, 4, 8]
  [2, 4, 6]
  */
}

var turn = 0;
var toggedMoves;


function runGame(){
  // Makes the tic tac toe board
  makeBoard(3, 3);

  // Sets the status to default
  loggedMoves = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];

  // Adds an event listener to all elements
  for(let i = 0; i < TD.length; i++){
    
    // Listens for mouseover on any table cell to highlight it
    TD[i].addEventListener("mouseover", function(){
      if(isEven(turn)){
          TD[i].style.backgroundColor = "#ffd3d5";
        } else {
          TD[i].style.backgroundColor = "#d3fff1";
        }
    });
    
    // Listens for mouseleave on any table cell to unhighlight it
    TD[i].addEventListener("mouseleave", function(){
      TD[i].style.backgroundColor = "";
    });

    // Listens for click on any table cell to add appropriate mark
    TD[i].addEventListener("click", function(){

      // Adds an image to display the symbol
      let mark = TD[i].appendChild(document.createElement('IMG'));

      // Checks who's turn it is to add the appropriate symbol
      if(isEven(turn)){
        mark.src = '/assets/x.png';
        loggedMoves.splice(i, 1, 'x');
        document.getElementById('statusimg').src = '/assets/o.png';
      } else {
        mark.src = '/assets/o.png';
        loggedMoves.splice(i, 1, 'o');
        document.getElementById('statusimg').src = '/assets/x.png';
      }

      // moves to next turn
      turn++;

      // Remove event liseners from that box
      TD[i].outerHTML = TD[i].outerHTML;
      TD[i].style.background = "";
      
      checkWin();
    });
  }
}

runGame();
