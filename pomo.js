


const workButton = document.querySelector("#workButton"),
      breakButton = document.querySelector("#breakButton"),
      notification = document.querySelector("#notification"),
      playButton = document.querySelector("#playButton"),
      pauseButton = document.querySelector("#pauseButton"),
      resetButton = document.querySelector("#resetButton"),
      minuteSpan = document.querySelector("#minuteSpan"),
      secondSpan = document.querySelector("#secondSpan"),
      workMin = document.querySelector("#workMin"),
      breakMin = document.querySelector("#breakMin"),
      incDec = document.querySelectorAll(".incDecButtons"),
      audio = new Audio("alarm-buzzer.mp3");

let minutes = 0,
    seconds = minutes * 60,
    interval,
    areYouWorking = null;


  let pomoInit = (activity) => {
    notification.classList.remove('show')
    if (activity == 'work') {
      notification.innerHTML = 'Get to Work!';
      areYouWorking = true;
      minutes = workMin.innerHTML = 25;
    } else {
      areYouWorking = false;
      minutes = breakMin.innerHTML = 5;
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
    setTimeout(() => {playButton.classList.remove('slide')}, 300);
  }

  let resetVal = () => {
    if (areYouWorking) {
      minutes = parseInt(workMin.innerHTML);
    } else {
      minutes = parseInt(breakMin.innerHTML);
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
      if(!areYouWorking){
      pomoInit('work');
      }else{
      pomoInit();
      }
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

  incDec.forEach(elem => {
    elem.addEventListener('click', event => {
      // Makes sure the value is always divisible by 5. No accidental countdown starts at 4's, 9's, etc.
        if (interval) {
          resetVal();
        }

        if(event.target.id == 'workMinus') {
          if(!areYouWorking){return}
          if(minutes <= 5) {return}

          workMin.innerHTML = minutes -= 5;
          seconds = minutes * 60;
          minuteSpan.innerHTML = zeroPad(minutes);
        } else if (event.target.id == 'workPlus') {
          if(!areYouWorking){return}
          if(minutes >= 90) {return}

          workMin.innerHTML = minutes += 5;
          seconds = minutes * 60;
          minuteSpan.innerHTML = zeroPad(minutes);
        }

        if(event.target.id == 'breakMinus') {
          if(areYouWorking){return}
          if(minutes <= 1) {return}
          if(minutes == 10){
            event.target.innerHTML = '-1';
            event.target.nextElementSibling.innerHTML = '+5';
            breakMin.innerHTML = minutes -= 5;
          }else if(minutes == 5){
            event.target.innerHTML = '-1';
            event.target.nextElementSibling.innerHTML = '+1';
            breakMin.innerHTML = minutes -= 1;
          }else if(minutes <= 4) {
            event.target.innerHTML = '-1';
            event.target.nextElementSibling.innerHTML = '+1';
            breakMin.innerHTML = minutes -= 1;
          }else{
            event.target.innerHTML = '-5';
            event.target.nextElementSibling.innerHTML = '+5';
            breakMin.innerHTML = minutes -= 5;
          }
          seconds = minutes * 60;
          minuteSpan.innerHTML = zeroPad(minutes);
       }else if (event.target.id == 'breakPlus') {
          if(areYouWorking){return}
          if(minutes >= 30) {return}
          if(minutes == 4){
            breakMin.innerHTML = minutes += 1;
            event.target.innerHTML = '+5';
          }else if(minutes <= 4){
            breakMin.innerHTML = minutes += 1;
            event.target.innerHTML = '+1';
          }else {
            breakMin.innerHTML = minutes += 5;
            event.target.previousElementSibling.innerHTML = '-5';
            event.target.innerHTML = '+5';
            }
          seconds = minutes * 60;
          minuteSpan.innerHTML = zeroPad(minutes);
        }

    });

  });

  workButton.addEventListener('click', () => {
    timerStop();
    notification.innerHTML = 'Get to Work!';
    showNotification();
    pomoInit('work');
    audioStop();
  });

  breakButton.addEventListener('click', () => {
    timerStop();
    notification.innerHTML = 'Take a break!';
    showNotification();
    pomoInit();
    audioStop();
  });

  playButton.addEventListener('click', () => {
    if (minutes == 0){return seconds = 0}
    if (interval) {
      timerStop();
    }
    interval = setInterval(countDown, 1000);
    showNotification();
    setTimeout(() => {playButton.classList.add('slide')}, 100);
  });

  pauseButton.addEventListener('click', () => {
    timerStop();
    slidePlay();
    audioStop();
  });

  resetButton.addEventListener('click', () => {
    timerStop();
    resetVal();
    slidePlay();
    audioStop();
    notification.classList.remove('show')
  });

  pomoInit('work');
