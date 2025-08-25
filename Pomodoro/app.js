const bells = new Audio('./sounds/bell.wav'); 
const startBtn = document.querySelector('.btn-start'); 
const ResetBtn = document.querySelector('.btn-reset'); 
const preset25 = document.querySelector('.preset25'); 
const preset5 = document.querySelector('.preset5'); 
let myInterval;
let state = true;

const minuteDisplay = document.querySelector('.minutes');
const secondDisplay = document.querySelector('.seconds');

function resetTimer() {
  // stop any running countdown
  clearInterval(myInterval);
  state = true;

  // parse the numbers from the inputs; fallback to 0 if empty
  const minsInput = parseInt(document.getElementById('mins').value, 10) || 0;
  const secsInput = parseInt(document.getElementById('secs').value, 10) || 0;

  if (minsInput > 59 || secsInput > 59) {
    alert('Please enter numbers between 0 and 59');
    return;
  }

  // update the display spans
  minuteDisplay.textContent = minsInput;
  secondDisplay.textContent = secsInput < 10 ? `0${secsInput}` : secsInput;
}

// register the reset handler
ResetBtn.addEventListener('click', resetTimer);

const appTimer = () => {
  // get the current values from the display
  const minutesLeft = parseInt(minuteDisplay.textContent, 10);
  const secondsLeft = parseInt(secondDisplay.textContent, 10);

  // total seconds calculated for countdown
  let totalSeconds = minutesLeft * 60 + secondsLeft;

  // Avoid bug where timer counts to negative numbers if started at 0:00
  if( totalSeconds === 0 ) {
    alert('Please set a time greater than 0.');
    return;
  }

  if (state) {
    state = false;

    const updateSeconds = () => {
      totalSeconds--;

      const minutesLeft = Math.floor(totalSeconds / 60);
      const secondsLeft = totalSeconds % 60;

      minuteDisplay.textContent = minutesLeft;
      secondDisplay.textContent = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;

      if (minutesLeft === 0 && secondsLeft === 0) {
        // play bell sound and reset the timer
        bells.play();
        clearInterval(myInterval);
      }
    }
      myInterval = setInterval(updateSeconds, 1000);
    } else {
      alert('Session has already started.');
    }
  }
  startBtn.addEventListener('click', appTimer);

  //set values to 25 for quick access to pomodoro technique presets
  const set25 = () => {
    document.getElementById('mins').value = 25;
    document.getElementById('secs').value = 0;
    resetTimer();
  }
  preset25.addEventListener('click', set25);

  //set values to 5 for quick access to pomodoro technique presets
  const set5 = () => {
    document.getElementById('mins').value = 5;
    document.getElementById('secs').value = 0;
    resetTimer();
  }
  preset5.addEventListener('click', set5);