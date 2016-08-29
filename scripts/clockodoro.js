const renderTimer = require('./render-timer');
const Timer = require('./timer');
const { $workInput, $breakInput } = require('./_selectors');

  const Clockodoro = {
  workDuration: $workInput.val() || 25,
  breakDuration: $breakInput.val() || 5,
  timers: [],
  get workSessions() { return this.timers.filter(t => t.isWorkTimer).length; },
  get breakSessions() { return this.timers.filter(t => t.isBreakTimer).length; },
  get timer() { return this.timers[0]; },

  generateNewTimer: function() {
    if (!this.timer) {
      this._generateWorkTimer();
    }
    if(this.timer) {

    }

    const nextDuration = this.timer.isWorkTimer ? this.breakDuration : this.workDuration;
    const nextStatus = this.timer.isWorkTimer ? 'break' : 'work'; 
  },

  _generateWorkTimer: function () {
    let workTimer = new Timer(this.workDuration, 'work');
    this._addToTimers(workTimer);
  },

  _generateBreakTimer: function () {
    let newBreakTimer = new Timer(this.breakDuration, 'break');
    this._addToTimers(newBreakTimer);
  },

  _generateLongBreakTimer: function () {
    let longBreakTimer = new Timer(this.breakDuration * 3, 'break');
    this._addToTimers(longBreakTimer);
  },

  _addToTimers: function (timer) {
    this.timers.unshift(timer)
  }

  startTimer() {
    this.timer.state = 'running';
    this.timer.generateStartTime();
    this._tick();
  },

  _tick() {
    renderTimer(this.timer);
    if(!this.timer.isElapsed) {
      setTimeout(this._tick.bind(this), 60);
    } else {
      this.generateNewTimer();
    }
  },

  // pauseTimer() {
  //   this.timer.state = 'paused';
  //   let pausedRemaining = this.timer.remainingTime;
  //   clearTimeout(this.tickTimeout);
  // },
  //
  // resumeTimer() {
  //   this.timer.startTime = this.pausedRemaining;
  //   this.startTimer();
  // },
  //
  // extendTimer() {
  // },
};

module.exports = Clockodoro;
