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
    interval,
    areYouWorking = null;


  let pomoInit = (activity) => {
    if (activity == 'work') {
      areYouWorking = true;
      minutes = 25;
    } else {
      areYouWorking = false;
      activity == 'break';
      minutes = 5;
    }
    seconds = minutes * 60;
    minuteSpan.innerHTML = zeroPad(minutes);
    secondSpan.innerHTML = '00';
  }

  let zeroPad = (num) => {
    return (num < 10) ? "0" + num : num;
  }

  let classShow = () => {
    notification.classList.add('show');
  }

  let resetVal = () => {
    if (areYouWorking) {
      minutes = 25;
    } else {
      minutes = 5;
    }

    seconds = minutes * 60;
    minuteSpan.innerHTML = zeroPad(minutes);
    secondSpan.innerHTML = '00';
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

  workButton.addEventListener('click', function() {
    timerStop();
    notification.innerHTML = 'Get to Work!';
    classShow();
    pomoInit('work');
  });

  breakButton.addEventListener('click', function() {
    timerStop();
    notification.innerHTML = 'Take a break!';
    classShow();
    pomoInit('break');
  });

  playButton.addEventListener('click', function() {
    if (interval) {
      timerStop();
    }
    interval = setInterval(countDown, 1000);
    classShow();
    setTimeout(function(){playButton.classList.add('slide')}, 100);
  });

  pauseButton.addEventListener('click', function() {
    timerStop();
    setTimeout(function(){playButton.classList.remove('slide')}, 300);
  });

  resetButton.addEventListener('click', function() {
    timerStop();
    resetVal();
    notification.classList.remove('show');
    setTimeout(function(){playButton.classList.remove('slide')}, 0);
  });

  pomoInit('work');
