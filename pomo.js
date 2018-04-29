let playButton = document.getElementById("playButton");
let pauseButton = document.getElementById("pauseButton");
let resetButton = document.getElementById("resetButton");
let minuteSpan = document.getElementById("minuteSpan");
let secondSpan = document.getElementById("secondSpan");
let minutes = 0;
let seconds = minutes * 60;
let interval;


let pomoInit = (activity) => {
  if (activity = 'work') {
    minutes = 25;
  } else {
    minutes = 5;
  }
  seconds = minutes * 60;
  minuteSpan.innerHTML = zeroPad(minutes);
  secondSpan.innerHTML = '00';
}

let zeroPad = (num) => {
  return (num < 10) ? "0" + num : num;
}

let countDown = () => {
  seconds--;

  if (seconds % 60 === 59) {
    minutes--;
    minuteSpan.innerHTML = zeroPad(minutes);
  }

  if (seconds == 0) {
    timerStop();
  }
  secondSpan.innerHTML = zeroPad(seconds % 60);
}


let timerStop = () => {
  clearInterval(interval);
}

playButton.addEventListener('click', function startTime() {
  if (interval) {
    timerStop();
  }
  interval = setInterval(countDown, 1000);
});

pauseButton.addEventListener('click', function() {
  clearInterval(interval);
});

resetButton.addEventListener('click', function() {
  timerStop()
  pomoInit('work');
});

pomoInit('work');
