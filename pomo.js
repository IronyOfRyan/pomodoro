/*jshint esversion: 6 */


// Convert to React reminder


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


let app = {

  minutes: 0,
  seconds: 0,
  interval: null,
  started: false,
  areYouWorking: null,
  // init that runs deafult settings whenever the page is reloaded
  init: (activity) => {
    if (activity == 'work') {
      notification.innerHTML = 'Get to Work!';
      this.areYouWorking = true;
      this.minutes = +workMin.innerHTML;
    } else {
      this.areYouWorking = false;
      this.minutes = +breakMin.innerHTML;
    }
    this.seconds = 0;
    app.renderTime();
  },
  // Padding that provides the extra 0 when the number is single digit
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
  toggleSelected: (work, rest) => {
    work.classList.add('selected');
    rest.classList.remove('selected');
  },
  // Renders the timer numbers on callback
  renderTime: () => {
    minuteSpan.innerHTML = app.zeroPad(this.minutes);
    secondSpan.innerHTML = app.zeroPad(this.seconds);
  },
  // Reset the value to whatver the work/break buttons value is
  resetVal: () => {
    this.started = false;
    if (this.areYouWorking) {
      this.minutes = parseInt(workMin.innerHTML);
    } else {
      this.minutes = parseInt(breakMin.innerHTML);
    }
    this.seconds = 0;
    app.renderTime();
  },
  // Logic that count the timer down from 59 seconds subtracting a minute everytime it reaches 0 until secs/min are both 0
  countDown: () => {
    if (!this.started) {
      return false;
    }

    if (this.seconds === 0) {
      if (this.minutes === 0) {
        app.timerDone();
        audio.play();
        return;
      }
      this.seconds = 59;
      this.minutes--;
    } else {
      this.seconds--;
    }
    app.renderTime();
  },
  audioStop: () => {
    audio.pause();
    audio.currentTime = 0;
  },
  // Clears the interval to stop the function from changing the numbers
  timerStop: () => {
    clearInterval(this.interval);
  },
  // When the timer gets to all 0's switch it from the work timer to the break and vice versa
  timerDone: () => {
    this.minutes = 0;
    this.seconds = 0;
    this.started = false;
    app.init() ? this.areYouWorking : app.init('work');
  },
  // Loops through the inc/dec buttons and picks which one is clicked
  inc: incDec.forEach(elem => {
    elem.addEventListener('click', event => {
      // Makes sure the value is always divisible by 5. No accidental countdown starts at 4's, 9's, etc.
      if (this.interval) {
        app.resetVal();
      }

      if (event.target.id == 'workMinus') {
        if (!this.areYouWorking) {
          return;
        }
        if (this.minutes <= 5) {
          return;
        }

        workMin.innerHTML = this.minutes -= 5;
        app.renderTime();
      } else if (event.target.id == 'workPlus') {
        if (!this.areYouWorking) {
          return;
        }
        if (this.minutes >= 90) {
          return;
        }

        workMin.innerHTML = this.minutes += 5;
        app.renderTime();
      }

      if (event.target.id == 'breakMinus') {
        if (this.areYouWorking) {
          return;
        }
        if (this.minutes <= 1) {
          return;
        }
        if (this.minutes == 10) {
          event.target.innerHTML = '-1';
          event.target.nextElementSibling.innerHTML = '+5';
          breakMin.innerHTML = this.minutes -= 5;
        } else if (this.minutes == 5) {
          event.target.innerHTML = '-1';
          event.target.nextElementSibling.innerHTML = '+1';
          breakMin.innerHTML = this.minutes -= 1;
        } else if (this.minutes <= 4) {
          event.target.innerHTML = '-1';
          event.target.nextElementSibling.innerHTML = '+1';
          breakMin.innerHTML = this.minutes -= 1;
        } else {
          event.target.innerHTML = '-5';
          event.target.nextElementSibling.innerHTML = '+5';
          breakMin.innerHTML = this.minutes -= 5;
        }
        app.renderTime();
      } else if (event.target.id == 'breakPlus') {
        if (this.areYouWorking) {
          return;
        }
        if (this.minutes >= 30) {
          return;
        }
        if (this.minutes == 4) {
          breakMin.innerHTML = this.minutes += 1;
          event.target.innerHTML = '+5';
        } else if (this.minutes <= 4) {
          breakMin.innerHTML = this.minutes += 1;
          event.target.innerHTML = '+1';
        } else {
          breakMin.innerHTML = this.minutes += 5;
          event.target.previousElementSibling.innerHTML = '-5';
          event.target.innerHTML = '+5';
        }
        app.renderTime();
      }
      app.timerStop();
    });

  }),
  workbutton: workButton.addEventListener('click', () => {
    app.timerStop();
    notification.innerHTML = 'Get to Work!';
    this.minutes = parseInt(workMin.innerHTML);
    this.areYouWorking = true;
    app.toggleSelected(workButton, breakButton);
    app.renderTime();
    app.audioStop();

  }),

  breakButton: breakButton.addEventListener('click', () => {
    app.timerStop();
    notification.innerHTML = 'Take a break!';
    app.toggleSelected(breakButton, workButton);
    app.init();
    app.audioStop();
  }),

  playButton: playButton.addEventListener('click', () => {
    if (this.minutes === 0) {
      this.seconds = 0;
    	return;
    }
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
