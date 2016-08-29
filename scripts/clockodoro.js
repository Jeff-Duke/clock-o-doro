const render = require('./render');
const Timer = require('./timer');
const _globals = require('./_globals');

const Clockodoro = {
  workSessions: 0,
  breakSessions: 0,
  intervalDuration: _globals.$intervalInput.val() || 25,
  breakDuration: _globals.$breakInput.val() || 5,
  timer: null,

  generateNewTimer: function() {

    if (this.workSessions === this.breakSessions) {
      this.timer = new Timer(this.intervalDuration);
      this.workSessions += 1;
    }
    else if (this.workSessions > this.breakSessions && this.breakSessions % 4 !== 0) {
      this.timer = new Timer(this.breakDuration);
      this.breakSessions += 1;
    }
    else if (this.workSessions > this.breakSessions && this.breakSessions % 4 === 0) {
      this.timer = new Timer(this.breakDuration * 3);
      this.breakSessions += 1;
    }
    return this.timer;
  },

  startTimer() {
    this.timer.state = 'running';
    this.timer.tick();
  },

  tick() {
    if(!this.timer.isElapsed) {
    setTimeout(this.tick.bind(this), 60);
    render(this.timer);
    }
    if(this.timer.isElapsed) {
      render(this.timer);
      return;
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
