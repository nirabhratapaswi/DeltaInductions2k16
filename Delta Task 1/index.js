var storeTime = 0, timeInterval, showTime, workingState = 1, stopCounter = 0;


	function getTimeRemaining(targetTime) {
		showTime = targetTime - Date.parse(new Date());
		var l = new Date();
		var showDays = Math.floor(showTime / (24*60*60*1000));
		var showHours = Math.floor((showTime / (60*60*1000)) % 24);
		var showMinutes = Math.floor((showTime / (60*1000)) % 60);
		var showSeconds = Math.floor((showTime / 1000) % 60);
		var showMilliseconds = 1000 - l.getMilliseconds();
	    document.getElementById("days").innerHTML = showDays;
		document.getElementById("hours").innerHTML = showHours;
		document.getElementById("minutes").innerHTML = showMinutes;
		document.getElementById("seconds").innerHTML = showSeconds;
		document.getElementById("milliseconds").innerHTML = showMilliseconds;
		if(showTime <= 0)
	    {
	    	clearInterval(timeInterval);
	    	document.getElementById("milliseconds").innerHTML = 0;
	    	workingState = 1;
	        stopCounter = 1;
	        executeResult();
	    }
	}


	function initializeClock() {
		var days = document.getElementById("inputDays").value;
		var hours = document.getElementById("inputHours").value;
		var minutes = document.getElementById("inputMinutes").value;
		var seconds = document.getElementById("inputSeconds").value;
		storeTime = (days*24*60*60*1000) + (hours*60*60*1000) + (minutes*60*1000) + (seconds*1000);
		document.getElementById("days").innerHTML = days;
		document.getElementById("hours").innerHTML = hours;
		document.getElementById("minutes").innerHTML = minutes;
		document.getElementById("seconds").innerHTML = seconds;
		document.getElementById("milliseconds").innerHTML = "00";
		document.getElementById("p01").innerHTML = storeTime;
	}


	function pauseTimer() {
		clearInterval(timeInterval);
	    workingState = 1;
	}


	function resumeTimer() {
		    if(stopCounter == 1)
		    	alert("Put New Countdown Value to Start");
		    else{
		    clearInterval(timeInterval);
		    workingState = 0;	
		    var currentTime = Date.parse(new Date());
		    var targetTime = currentTime + showTime;
		    document.getElementById("p01").innerHTML = targetTime;
		    function updateTime(){
		    	getTimeRemaining(targetTime);
		    }	
		    timeInterval = setInterval(updateTime, 1);
		    updateTime();
		}
	}


	function stopTimer() {
		clearInterval(timeInterval);
	    workingState = 1;
	    stopCounter = 1;
	}


	function resetTimer() {
		    clearInterval(timeInterval);	
		    var currentTime = Date.parse(new Date());
		    var targetTime = currentTime + storeTime;
		    document.getElementById("p01").innerHTML = targetTime;
		    function updateTime(){
		    	getTimeRemaining(targetTime);
		    	document.getElementById("milliseconds").innerHTML = 0;
		    }	
		    updateTime();
		    stopCounter = 0;
		    workingState = 1;
	}


	function startTimer() {
		if(workingState == 0)
			alert("Stop Timer to Set Up New Countdown");
		else if(stopCounter == 1)
			alert("Put New Countdown Value to Start");
		else
		{
			workingState = 0;
		    var currentTime = Date.parse(new Date());
		    var targetTime = currentTime + storeTime;
		    document.getElementById("p01").innerHTML = targetTime;
		    function updateTime(){
		    	getTimeRemaining(targetTime);
		    }	
		    timeInterval = setInterval(updateTime, 1);
		    updateTime();
	    }
	}


	function updateTimer() {
		clearInterval(timeInterval);
		workingState = 1;
		stopCounter = 0;
		initializeClock();
	}


var x = document.getElementById("myAudio");


function executeResult() {
	playAudio();
}


function playAudio() { 
    x.play(); 
} 


function pauseAudio() { 
    x.pause(); 
} 