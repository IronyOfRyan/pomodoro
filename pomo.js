

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
    seconds: this.minutes * 60,
    interval: null,
    areYouWorking: null,
    init: (activity) => {
      notification.classList.remove('show')
      if (activity == 'work') {
        this.notification.innerHTML = 'Get to Work!';
        this.areYouWorking = true;
        this.minutes = workMin.innerHTML = 25;
      } else {
        this.areYouWorking = false;
        this.minutes = breakMin.innerHTML = 5;
      }
      this.seconds = this.minutes * 60;
      minuteSpan.innerHTML = app.zeroPad(this.minutes);
      secondSpan.innerHTML = '00';
    },
    resetValu: (mins, secs, started) =>{

    },
    zeroPad: (num) => {
      return (num < 10) ? "0" + num : num;
    },
    showNotification: () => {
      notification.classList.add('show');
    },
    slidePlay: () => {
      setTimeout(() => {playButton.classList.remove('slide')}, 300);
    },
    resetVal: () => {
      if (this.areYouWorking) {
        this.minutes = parseInt(workMin.innerHTML);
      }else {
        this.minutes = parseInt(breakMin.innerHTML);
    }
      this.seconds = this.minutes * 60;
      minuteSpan.innerHTML = app.zeroPad(minutes);
      secondSpan.innerHTML = '00';
    },
    countDown: () => {
      this.seconds--;

      if (this.seconds % 60 === 59) {
        this.minutes--;
        minuteSpan.innerHTML = app.zeroPad(minutes);
      }

      if (this.seconds == 0) {
        app.timerStop();
        audio.play()
        if(!this.areYouWorking){
        this.init('work');
        }else{
        this.init();
        }
      }
        this.secondSpan.innerHTML = app.zeroPad(seconds % 60);
      },
    audioStop: () => {
      audio.pause();
      audio.currentTime = 0;
    },
    timerStop: () => {
    clearInterval(this.interval);
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
                this.seconds = this.minutes * 60;
                minuteSpan.innerHTML = app.zeroPad(minutes);
              } else if (event.target.id == 'workPlus') {
                if(!this.areYouWorking){return}
                if(this.minutes >= 90) {return}

                workMin.innerHTML = this.minutes += 5;
                this.seconds = this.minutes * 60;
                minuteSpan.innerHTML = app.zeroPad(minutes);
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
                this.seconds = this.minutes * 60;
                minuteSpan.innerHTML = app.zeroPad(minutes);
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
                this.seconds = this.minutes * 60;
                minuteSpan.innerHTML = app.zeroPad(minutes);
              }

          });
      }),
  workbutton: workButton.addEventListener('click', () => {
    app.timerStop();
    notification.innerHTML = 'Get to Work!';
    app.showNotification();
    this.minutes = parseInt(workMin.innerHTML);
    this.areYouWorking = true;
    minuteSpan.innerHTML = app.zeroPad(minutes);
    app.audioStop();
  }),

  breakButton: breakButton.addEventListener('click', () => {
    app.timerStop();
    notification.innerHTML = 'Take a break!';
    app.showNotification();
    app.init();
    app.audioStop();
  }),

  playButton: playButton.addEventListener('click', () => {
    if (this.minutes == 0){return this.seconds = 0}
    if (this.interval) {
      app.timerStop();
    }
    this.interval = setInterval(app.countDown, 1000);
    app.showNotification();
    setTimeout(() => {playButton.classList.add('slide')}, 100);
  }),

  pauseButton: pauseButton.addEventListener('click', () => {
    app.timerStop();
    app.slidePlay();
    app.audioStop();
  }),

  resetButton: resetButton.addEventListener('click', () => {
    app.timerStop();
    app.resetVal();
    app.slidePlay();
    app.audioStop();
    notification.classList.remove('show')
  })

};

  app.init('work');
