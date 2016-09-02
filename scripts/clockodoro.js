const Timer = require('./timer');
const { $workInput, $breakInput, } = require('./_selectors');
const {renderTimer, renderTimerInitially } = require('./render-timer');

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
    renderTimer(this.timer);
    if(this.timer.isElapsed) {
      this.generateNewTimer();
      renderTimerInitially(this.timer);
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
    this.soundHasPlayed = false;
  },

  setWorkDuration(minutes) {
    this.workDuration = minutes;

    if(this.timer && this.timer.isWorkTimer) {
      this.timers.splice([0],1);
      this.generateNewTimer();
      renderTimerInitially(this.timer);
    }
  },

  setBreakDuration(minutes) {
    this.breakDuration = minutes;

    if(this.timer.isBreakTimer) {
      this.timers.splice([0],1);
      this.generateNewTimer();
      renderTimerInitially(this.timer);
    }
  },

};

module.exports = Clockodoro;
