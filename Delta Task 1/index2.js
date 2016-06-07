var storeTime = 0, timeInterval, showTime, workingState = 1, stopCounter = 0, savedTime;


window.onload = function () {
    if(document.cookie.length != 0) {
		var savedTimeArray = document.cookie.split("=");
		savedTime = parseInt(savedTimeArray[1]);
		var days = Math.floor(savedTime / (24*60*60*1000));           //calculation of days,hours,minutes,seconds using Cookie
		var hours = Math.floor((savedTime / (60*60*1000)) % 24);
		var minutes = Math.floor((savedTime / (60*1000)) % 60);
		var seconds = Math.floor((savedTime / 1000) % 60);
		//initializeClock(days, hours, minutes, seconds);
	}
	savedTime = localStorage.getItem("store");
	var days = Math.floor(savedTime / (24*60*60*1000));           //calculation of days,hours,minutes,seconds using LocalStorage
		var hours = Math.floor((savedTime / (60*60*1000)) % 24);
		var minutes = Math.floor((savedTime / (60*1000)) % 60);
		var seconds = Math.floor((savedTime / 1000) % 60);
		initializeClock(days, hours, minutes, seconds);
}


	function getTimeRemaining(targetTime) {                               //get remaining time
		showTime = targetTime - Date.parse(new Date());
		var l = new Date();
		var showDays = Math.floor(showTime / (24*60*60*1000));           //calculation of days,hours,minutes,seconds
		var showHours = Math.floor((showTime / (60*60*1000)) % 24);
		var showMinutes = Math.floor((showTime / (60*1000)) % 60);
		var showSeconds = Math.floor((showTime / 1000) % 60);
		var showMilliseconds = 1000 - l.getMilliseconds();
	    document.getElementById("days").innerHTML = showDays;                //setting up countdown values
		document.getElementById("hours").innerHTML = showHours;
		document.getElementById("minutes").innerHTML = showMinutes;
		document.getElementById("seconds").innerHTML = showSeconds;
		document.getElementById("milliseconds").innerHTML = showMilliseconds;
		if(typeof(Storage) != "undefined") {
			localStorage.setItem("store" , showTime);
		}
		if(showTime <= 0)
	    {
	    	clearInterval(timeInterval);
	    	document.getElementById("milliseconds").innerHTML = 0;
	    	workingState = 1;
	        stopCounter = 1;
	        executeResult();
	    }
	}


	function initializeClock(days, hours, minutes, seconds) {               //initializing timer
		storeTime = (days*24*60*60*1000) + (hours*60*60*1000) + (minutes*60*1000) + (seconds*1000);
		document.getElementById("days").innerHTML = days;
		document.getElementById("hours").innerHTML = hours;
		document.getElementById("minutes").innerHTML = minutes;
		document.getElementById("seconds").innerHTML = seconds;
		document.getElementById("milliseconds").innerHTML = "00";
		document.getElementById("p01").innerHTML = storeTime;
	}


	function pauseTimer() {                   				//pause timer
		clearInterval(timeInterval);
	    workingState = 1;
	}


	function resumeTimer() {							//resume timer
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


	function stopTimer() {									//stop timer
		clearInterval(timeInterval);
	    workingState = 1;
	    stopCounter = 1;
	}


	function resetTimer() {        									//reset timer
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


	function startTimer() { 								//start timer
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


	function updateTimer() {						//updating values to time
		clearInterval(timeInterval);
		workingState = 1;
		stopCounter = 0;
		var days = document.getElementById("inputDays").value;
		var hours = document.getElementById("inputHours").value;
		var minutes = document.getElementById("inputMinutes").value;
		var seconds = document.getElementById("inputSeconds").value;
		if(days == "")
			days = 0;
		if(hours == "")
			hours = 0;
		if(minutes == "")
			minutes = 0;
		if(seconds == "")
			seconds = 0;
		if(days<0)
			alert("Enter valid days!!");
		else if(hours<0 || hours>23)
			alert("Enter valid hours!!");
		else if(minutes<0 || minutes>59)
			alert("Enter valid minutes!!");
		else if(seconds<0 || seconds>59)
			alert("Enter valid seconds!!");
		else
			initializeClock(days, hours, minutes, seconds);
	}


var x = document.getElementById("myAudio");


function executeResult() {     				//for playing alarm sound when countdown is complete
	playAudio(); 
}


function playAudio() { 
    x.play(); 
} 


function pauseAudio() { 
    x.pause(); 
}


function saveCookie() {
    document.cookie = "milliSeconds=" + showTime + ";expires=Tue , 31 May 2016 10:00:00 UTC;"; 
}