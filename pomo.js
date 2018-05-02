

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
      progress = document.querySelector('.progress-bar'),
      audio = new Audio("alarm-buzzer.mp3");


let app = {

    progress: null,
    audio: null,
    minutes: 0,
    seconds: 0,
    interval: null,
    started: false,
    areYouWorking: null,
    init: (activity) => {
      if (activity == 'work') {
        notification.innerHTML = 'Get to Work!';
        this.areYouWorking = true;
        this.minutes = +workMin.innerHTML ;
      } else {
        this.areYouWorking = false;
        this.minutes = +breakMin.innerHTML;
      }
      this.seconds = 00;
      app.renderDom();
    },
    resetVariables: (mins, secs, started) =>{
      this.minutes = mins;
      this.seconds = secs;
      this.started = started;
    },
    zeroPad: (num) => {
      return (num < 10) ? "0" + num : num;
    },
    hideNotification: () => {
      notification.classList.add('hide');
      notification.classList.remove('show');
    },
    showNotification: () => {
      notification.classList.remove('hide');
      notification.classList.add('show');
    },
    renderDom: () => {
      minuteSpan.innerHTML = app.zeroPad(this.minutes);
      secondSpan.innerHTML = app.zeroPad(this.seconds);
    },
    resetVal: () => {
      this.started = false;
      if (this.areYouWorking) {
        this.minutes = parseInt(workMin.innerHTML);
      }else {
        this.minutes = parseInt(breakMin.innerHTML);
    }
      this.seconds = 00;
      app.renderDom();
    },
    countDown: () => {
      if(!this.started){return false}

      if (this.seconds == 0) {
        if(this.minutes == 0) {
        app.timerDone();
        audio.play()
        return;
        }
        this.seconds = 59;
        this.minutes--;
        }else{
        this.seconds--;
        }
      app.renderDom();
      },
    audioStop: () => {
      audio.pause();
      audio.currentTime = 0;
    },
    timerStop: () => {
    clearInterval(this.interval);
    },
    timerDone: () => {
      this.minutes = 0;
      this.seconds = 00;
      this.started = false;
      app.init() ? areYouWorking : app.init('work');
    },
    inc: incDec.forEach(elem => {
          elem.addEventListener('click', event => {
            // Makes sure the value is always divisible by 5. No accidental countdown starts at 4's, 9's, etc.
              if (this.interval) {
                app.resetVal();
              }

              if(event.target.id == 'workMinus') {
                if(!this.areYouWorking){return}
                if(this.minutes <= 5) {return}

                workMin.innerHTML = this.minutes -= 5;
                minuteSpan.innerHTML = app.zeroPad(this.minutes);
              } else if (event.target.id == 'workPlus') {
                if(!this.areYouWorking){return}
                if(this.minutes >= 90) {return}

                workMin.innerHTML = this.minutes += 5;
                app.renderDom();
              }

              if(event.target.id == 'breakMinus') {
                if(this.areYouWorking){return}
                if(this.minutes <= 1) {return}
                if(this.minutes == 10){
                  event.target.innerHTML = '-1';
                  event.target.nextElementSibling.innerHTML = '+5';
                  breakMin.innerHTML = this.minutes -= 5;
                }else if(this.minutes == 5){
                  event.target.innerHTML = '-1';
                  event.target.nextElementSibling.innerHTML = '+1';
                  breakMin.innerHTML = this.minutes -= 1;
                }else if(this.minutes <= 4) {
                  event.target.innerHTML = '-1';
                  event.target.nextElementSibling.innerHTML = '+1';
                  breakMin.innerHTML = this.minutes -= 1;
                }else{
                  event.target.innerHTML = '-5';
                  event.target.nextElementSibling.innerHTML = '+5';
                  breakMin.innerHTML = this.minutes -= 5;
                }
                app.renderDom();
             }else if (event.target.id == 'breakPlus') {
                if(this.areYouWorking){return}
                if(this.minutes >= 30) {return}
                if(this.minutes == 4){
                  breakMin.innerHTML = this.minutes += 1;
                  event.target.innerHTML = '+5';
                }else if(this.minutes <= 4){
                  breakMin.innerHTML = this.minutes += 1;
                  event.target.innerHTML = '+1';
                }else {
                  breakMin.innerHTML = this.minutes += 5;
                  event.target.previousElementSibling.innerHTML = '-5';
                  event.target.innerHTML = '+5';
                  }
                app.renderDom()
              }
              app.timerStop();
          });

      }),
  workbutton: workButton.addEventListener('click', () => {
    app.timerStop();
    notification.innerHTML = 'Get to Work!';
    this.minutes = parseInt(workMin.innerHTML);
    this.areYouWorking = true;
    minuteSpan.innerHTML = app.zeroPad(this.minutes);
    app.audioStop();
  }),

  breakButton: breakButton.addEventListener('click', () => {
    app.timerStop();
    notification.innerHTML = 'Take a break!';
    app.init();
    app.audioStop();
  }),

  playButton: playButton.addEventListener('click', () => {
    if (this.minutes == 0){return this.seconds = 0}
    if (this.interval) {
      app.timerStop();
    }
    this.started = true;
    this.interval = setInterval(app.countDown, 1000);
    app.hideNotification();

  }),

  pauseButton: pauseButton.addEventListener('click', () => {
    app.timerStop();
    app.audioStop();
    app.showNotification();
  }),

  resetButton: resetButton.addEventListener('click', () => {
    app.timerStop();
    app.resetVal();
    app.audioStop();
    app.showNotification();
  })

};

  app.init('work');
