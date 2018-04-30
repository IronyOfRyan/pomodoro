//
const workButton = document.getElementById("workButton"),
      breakButton = document.getElementById("breakButton"),
      notification = document.getElementById("notification"),
      playButton = document.getElementById("playButton"),
      pauseButton = document.getElementById("pauseButton"),
      resetButton = document.getElementById("resetButton"),
      minuteSpan = document.getElementById("minuteSpan"),
      secondSpan = document.getElementById("secondSpan");
let minutes = 0,
    seconds = minutes * 60,
    interval;


  let pomoInit = (activity) => {
    if (activity == 'work') {
      notification.innerHTML = 'Get to Work!';
      minutes = 25;
    } else {
      notification.innerHTML = 'Take a break!';
      activity = 'break';
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


  const timerStop = () => {
    clearInterval(interval);
  }

  workButton.addEventListener('click', function() {
    pomoInit('work');
  });

  breakButton.addEventListener('click', function() {
    pomoInit('break');
  });

  playButton.addEventListener('click', function() {
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
  });

  pomoInit('work');
