/*    ***   FUNCTIONS TO BE USED :
- WINDOW ONLOAD - INITIALIZE RANDOM VALUES
- RANDOM NUMBER GENERATING ALGORITHM
- CLICK FUNCTION
*/


//**********************************************Variables******************************************//


var movesDone = 0,storeArray = [], tempArray = [], intSquareVal, checkHide = [-1, -2, -3, -4], count = 0, winCount = 0, checkSize, start = 0;
var timerInterval, startTime, days, seconds, hours, minutes, tiTi, scoreP = [0,0], check = 0, gameState = 0;


//**********************************************window.onload******************************************//


window.onload = function() {
    randomAllocateArray(document.getElementById("squareSizeVal").value);                //allocates the array to fit into the chosen grid
}


//**********************************************randomAllocateArray******************************************//


function randomAllocateArray(squareSizeVal) {                           //function for random array allocation
  if((document.getElementById("squareSizeVal").value > 0) && (document.getElementById("squareSizeVal").value % 2 == 0)) {
    gameState = 0;
    document.getElementById("dispPointsPara").style.visibility = "hidden";
    winCount = 0;
    checkSize = squareSizeVal;
    var widthHeight = (squareSizeVal * 124 ) + 5;
    document.getElementById("mainGridId").style.width = widthHeight + 'px';
    document.getElementById("mainGridId").style.height = widthHeight + 'px';
    var textDivisionAllotment = "", i = 0;
    intSquareVal = parseInt(squareSizeVal);
    for(i = 0 ; i < intSquareVal*intSquareVal ; i++) {
      textDivisionAllotment = textDivisionAllotment + '<button id="b' + (i + 1) + '" onClick="changeVisibility(' + (i + 1) + ')"> <span id="span' + (i + 1) + '"> </span> </button>';
    }
    textDivisionAllotment = textDivisionAllotment + '<div class="restart"><button type="button" id="buttonRestart" onClick="resetGame()">RESTART GAME</button></div>';
    document.getElementById("mainGridId").innerHTML = textDivisionAllotment;
    shuffleNumbers();
    allocateNumbers();
    clearTimeout(tiTI);
    start = 0;
    movesDone = 0;
  }
  else {
    alert("Enter even number greater than ZERO!!!!");
  }
}


//**********************************************allocateNumbers******************************************//


function allocateNumbers() {
  var i = 0;
  for(i = 1; i <= intSquareVal*intSquareVal; i++) {
    document.getElementById("span" + i).innerHTML = storeArray[i-1];
  }
}


//**********************************************shuffleNumbers******************************************//


function swap1(a, b) {                                          //swap function used in shuffle numbers
  var temp = storeArray[a];
  storeArray[a] = storeArray[b];
  storeArray[b] = temp;
}


function shuffleNumbers() {                                      //Similar Algorithm to Fisher_Yates Algo
  var i = 0, storeNumber;
  allotRandomNumbers();
  for(i = (intSquareVal*intSquareVal - 1); i > 0 ; i--) {
    storeNumber = Math.floor(Math.random() * i);
    swap1(i, storeNumber);
  }
  for(i = 1; i <= intSquareVal*intSquareVal; i++) {
    document.getElementById("span" + i).innerHTML = storeArray[i-1];
    document.getElementById("span" + i).style.visibility = "hidden";
  }
}


function allotRandomNumbers() {                                       //Writing the shuffled random numbers to the tiles
  var i = 0;
  for(i = 0; i < (intSquareVal*intSquareVal/2); i++) {
    tempArray[i] = Math.ceil(Math.random() * intSquareVal * intSquareVal);
  }
  for(i = 1; i <= intSquareVal*intSquareVal; i++) {
    if(i <= (intSquareVal*intSquareVal/2))
      storeArray[i-1] = tempArray[i-1];
    else
      storeArray[i-1] = tempArray[(intSquareVal*intSquareVal) - i];
  }
}


//**********************************************testFunction******************************************//


function changeVisibility(a) {                                      //Changing visibility on clicking tiles
  if(gameState == 0) {
    if(start == 0) {
      startTime = new Date();
      start = 1;
      startClock();
    }
    movesDone++;
    document.getElementById("dispMoves").innerHTML = movesDone;//parseInt(document.getElementById("dispMoves").innerHTML) + moves;
    document.getElementById("span" + a).style.visibility = "visible";
    document.getElementById("b" + a).className = "cli";
    checkHide[count] = parseInt(document.getElementById("span" + a).innerHTML);
    checkHide[count + 2] = parseInt(a);
    //document.getElementById("p01").innerHTML = checkHide[count];
    count++;
    if(checkHide[2] == checkHide[3]) {
      document.getElementById("b" + a).className = "cliEnd";
      document.getElementById("span" + a).style.visibility = "hidden";
      count = 0;
      checkHide[2] = -3;
      checkHide[3] = -4;
    }
    else if(count >= 2) {
      if(checkHide[0] != checkHide[1]) {
        setTimeout(function() {
          document.getElementById("b" + a).className = "cliEnd";
          document.getElementById("span" + a).style.visibility = "hidden";
          document.getElementById("b" + checkHide[2]).className = "cliEnd";
          document.getElementById("span" + checkHide[2]).style.visibility = "hidden";
        }, 200);

      }
      else if(checkHide[0] == checkHide[1])
        winCount++;
      count = 0;
    }
    if(winCount >= (intSquareVal*intSquareVal/2)) {
      gameState = 1;
      movesDone = 0;
      start = 0;
      clearTimeout(tiTI);
      var actualPoints = 1000/((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60) + seconds);
      document.getElementById("dispPointsPara").innerHTML = "Scored " + actualPoints.toFixed(2) + " points!!!Congrats.....";
      document.getElementById("dispPointsPara").style.visibility = "visible";
      setTimeout(function(){alert(document.getElementById("inputName").value + " you WON!!!...see results below-->")}, 600);
    }
  }
}


//**********************************************resetGame******************************************//


function resetGame() {                                              //Reset Game
    randomAllocateArray(checkSize);
    movesDone = 0;
    winCount = 0;
    start = 0;
    gameState = 0;
    document.getElementById("dispPointsPara").innerHTML = "";
    document.getElementById("dispPointsPara").style.visibility = "hidden";
    clearTimeout(tiTI);
}


//**********************************************startCounter******************************************//


function startClock() {                                          //Starting Upcount Clock
	var checkTime = new Date();
	var dispTime = Date.parse(checkTime) - Date.parse(startTime);
	seconds = Math.floor((dispTime / 1000) % 60);
	minutes = Math.floor((dispTime / (1000 * 60)) % 60);
	hours = Math.floor((dispTime / (1000 * 60 * 60)) % 24);
	days = Math.floor(dispTime / (1000 * 60 * 60 * 24));
  /*if(seconds == 10) {
    scoreP[0] = movesDone * 1;
    check = movesDone;
  }
  if(seconds == 30) {
    scoreP[1] = (movesDone-check) * 3;
    check = movesDone;
  }*/
	document.getElementById("dispTimeSpan").innerHTML = days + ":" + hours + ":" + minutes + ":" + seconds;
  tiTI = setTimeout(startClock, 1000);
}
