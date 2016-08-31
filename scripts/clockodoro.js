const Timer = require('./timer');
const { $, $workInput, $breakInput, $timerDisplay } = require('./_selectors');

const Clockodoro = {
  workDuration: $workInput.val() || 25,
  breakDuration: $breakInput.val() || 5,
  timers: [],
  soundHasPlayed: false,

  get workSessions() { return this.timers.filter(t => t.isWorkTimer).length; },
  get breakSessions() { return this.timers.filter(t => t.isBreakTimer).length; },
  get timer() { return this.timers[0]; },


  generateNewTimer: function() {
    if (this.timer && this.timer.type === 'work') { this._generateBreakTimer(); }
    else { this._generateWorkTimer(); }
  },

  _generateWorkTimer: function() {
    let workTimer = new Timer(this.workDuration, 'work');
    this._addToTimers(workTimer);
  },

  _generateBreakTimer: function() {
    if(this.breakSessions % 4 === 0 && this.breakSessions > 1) { this._generateLongBreakTimer(); }
    else{
    let shortBreakTimer = new Timer(this.breakDuration, 'break');
    this._addToTimers(shortBreakTimer);
    }
  },

  _generateLongBreakTimer: function() {
    let longBreakTimer = new Timer(this.breakDuration * 3, 'break');
    this._addToTimers(longBreakTimer);
  },

  _addToTimers: function(timer) {
    this.timers.unshift(timer);
  },


  startTimer() {
    this.timer.state = 'running';
    this.timer.generateStartTime();
    this._tick();
  },

  _tick() {
    this.renderTimer();
    if(this.timer.isElapsed) {
      this.generateNewTimer();
      this.renderTimerInitially();
    }
    else {
      setTimeout(this._tick.bind(this), 50);
      if (this.timer.remainingTime  < 21000) {
        this.playSound();
      }
    }
  },


  playSound() {
    if(this.timer.state === 'running' && this.soundHasPlayed === false) {
      const beep = new Audio('../sounds/beep.wav');
      beep.play();
      this.soundHasPlayed = true;
      setTimeout(this._resetSound.bind(this), 5000);
    }
  },

  _resetSound() {
    console.log('sound reset!');
    this.soundHasPlayed = false;
  },


  renderTimer() {
    let seconds = this.timer.remainingTime / 1000;
    let ss = Math.floor(seconds % 60);
    let mm = Math.floor(seconds / 60) % 60;
    let hh = Math.floor(seconds / 3600) % 100;
    return this.timer.isWorkTimer ? this._renderWorkTimer(hh,mm,ss) : this._renderBreakTimer(hh,mm,ss);
  },

  _renderWorkTimer(hh,mm,ss) {
    $timerDisplay.html('');
    return $timerDisplay.append($(`
      <p class="work-timer-display">${(hh > 0 ? hh + ":" : '') + (mm < 10 ? "0" + mm: mm) + ":" + (ss < 10 ? "0" + ss : ss)}</p>
      `));
  },

  _renderBreakTimer(hh,mm,ss) {

    $timerDisplay.html('');
    return $timerDisplay.append($(`
      <p class="break-timer-display">${(hh > 0 ? hh + ":" : '') + (mm < 10 ? "0" + mm: mm) + ":" + (ss < 10 ? "0" + ss : ss)}</p>
      `));
  },

  renderTimerInitially() {
    $timerDisplay.html('');
    let seconds = this.timer.duration / 1000;
    let ss = Math.floor(seconds % 60);
    let mm = Math.floor(seconds / 60) % 60;
    let hh = Math.floor(seconds / 3600) % 100;
    return $timerDisplay.append($(`
      <p class="base-timer-display">${(hh > 0 ? hh + ":" : '') + (mm < 10 ? "0" + mm: mm) + ":" + (ss < 10 ? "0" + ss : ss)}</p>
      `));
  },


  setWorkDuration(minutes) {
    this.workDuration = minutes;

    if(this.timer && this.timer.isWorkTimer) {
      this.timers.splice([0],1);
      this.generateNewTimer();
      this.renderTimerInitially();
    }
  },

  setBreakDuration(minutes) {
    this.breakDuration = minutes;

    if(this.timer.isBreakTimer) {
      this.timers.splice([0],1);
      this.generateNewTimer();
      this.renderTimerInitially();
    }
  },

};

module.exports = Clockodoro;
