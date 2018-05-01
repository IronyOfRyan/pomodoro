


const workButton = document.getElementById("workButton"),
      breakButton = document.getElementById("breakButton"),
      notification = document.getElementById("notification"),
      playButton = document.getElementById("playButton"),
      pauseButton = document.getElementById("pauseButton"),
      resetButton = document.getElementById("resetButton"),
      minuteSpan = document.getElementById("minuteSpan"),
      secondSpan = document.getElementById("secondSpan"),
      audio = new Audio("alarm-buzzer.mp3");

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

  let showNotification = () => {
    notification.classList.add('show');
  }

  let slidePlay = () => {
    setTimeout(function(){playButton.classList.remove('slide')}, 300);
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
      audio.play()
    }
    secondSpan.innerHTML = zeroPad(seconds % 60);
  }

  let audioStop = () => {
    audio.pause();
    audio.currentTime = 0;
  }


  let timerStop = () => {
    clearInterval(interval);
  }

  workButton.addEventListener('click', function() {
    timerStop();
    notification.innerHTML = 'Get to Work!';
    showNotification();
    pomoInit('work');
    audioStop();
  });

  breakButton.addEventListener('click', function() {
    timerStop();
    notification.innerHTML = 'Take a break!';
    showNotification();
    pomoInit('break');
  });

  playButton.addEventListener('click', function() {
    if (interval) {
      timerStop();
    }
    interval = setInterval(countDown, 1000);
    showNotification();
    setTimeout(function(){playButton.classList.add('slide')}, 100);
  });

  pauseButton.addEventListener('click', function() {
    timerStop();
    slidePlay();
    audioStop();
  });

  resetButton.addEventListener('click', function() {
    timerStop();
    resetVal();
    slidePlay();
    audioStop();
    notification.classList.remove('show')
  });

  pomoInit('work');
