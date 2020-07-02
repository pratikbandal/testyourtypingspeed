const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
var timer = [0,0,0,0];
var interval;
var timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZeroes(time) {
    if (time<=9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZeroes(timer[0]) + ':' + leadingZeroes(timer[1]) + ':' + leadingZeroes(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;
    timer[0] = Math.floor((timer[3]*0.01)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0]*60));
    timer[2] = Math.floor((timer[3] - (timer[1]*100) - (timer[0]*6000)));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    var textEntered = testArea.value;
    var originalTextMatch = originText.substring(0, textEntered.length);

    if (textEntered == originText) {
        clearInterval(interval);
        testWrapper.style.borderColor = 'orange';
    }
    else if (textEntered == originalTextMatch) {
        testWrapper.style.borderColor = 'yellow';
    }
    else {
        testWrapper.style.borderColor = 'red';
    }


}

// Start the timer:
function start() {
    var testAreaLength = testArea.value.length;
    //console.log(testAreaLength);
    if(testAreaLength===0 && !timerRunning) {
        timerRunning = true;
        //console.log(true);
        interval = setInterval(runTimer, 10);
    }
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    theTimer.innerHTML = "00:00:00";
    timerRunning = false;

    testArea.value = '';
    testWrapper.style.borderColor = 'grey';
}

function paste() {
    alert('Don\'t even try');
    setTimeout(clear, 1000);
}
function clear() {
    testArea.value = '';
}


// Event listeners for keyboard input and the reset button:

testArea.addEventListener('keypress', start, false);
testArea.addEventListener('keyup',spellCheck, false);
resetButton.addEventListener('click', reset, false)

