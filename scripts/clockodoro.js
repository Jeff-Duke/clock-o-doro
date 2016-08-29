const render = require('./render');
const Timer = require('./timer');
const { $intervalInput, $breakInput } = require('./_globals');

const Clockodoro = {
  get workSessions() { return this.timers.filter(t => t.isWorkTimer).length },
  get breakSessions() { return this.timers.filter(t => t.isBreakTimer).length },
  intervalDuration: $intervalInput.val() || 25,
  breakDuration: $breakInput.val() || 5,
  timers: [],
  get timer() { return this.timers[0]; },

  generateNewTimer: function() {
    if (!this.timer) {
      return this.timers.unshift(new Timer(this.intervalDuration, 'work'))
    }

    const nextDuration = this.timer.isWorkTimer ? this.breakDuration : this.intervalDuration;
    const nextStatus = this.timer.isWorkTimer ? 'break' : 'work';
    this.timers.unshift(new Timer(this.intervalDuration, nextStatus));
  },

  _generateWorkTimer: function () {

  },

  _generateBreakTimer: function () {

  },

  _generateLongBreakTimer: function () {

  }

  startTimer() {
    this.timer.state = 'running';
    this.timer.tick();
  },

  tick() {
    render(this.timer);
    if(!this.timer.isElapsed) {
      setTimeout(this.tick.bind(this), 60);
    } else {
      this.generateNewTimer();
    }
  },

  pauseTimer() {
    this.timer.state = 'paused';
    let pausedRemaining = this.timer.remainingTime;
    let paused = setTimeout(this.timer.tick);
    clearTimeout(paused);
  },

  resumeTimer() {
    let timer = new Timer(pausedRemaining);
  },

  extendTimer() {
  },
};

module.exports = Clockodoro;
