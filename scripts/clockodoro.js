const render = require('./render');
const Timer = require('./timer');
const _globals = require('./_globals');

var clockodoro = {
  workSessions: 0,
  breakSessions: 0,
  intervalDuration: _globals.$intervalInput.val(),
  breakDuration: _globals.$breakInput.val(),

  generateNewTimer: function() {
    if (this.workSessions === this.breakSessions) {
      let timer = new Timer(this.intervalDuration);
      this.workSessions += 1;
    }
    if (this.workSessions > this.breakSessions && this.breakSessions % 4 !== 0) {
      let timer = new Timer(this.breakDuration);
      this.breakSessions += 1;
    }
    if (this.workSessions > this.breakSessions && this.breakSessions % 4 === 0) {
      let timer = new Timer(this.breakDuration * 3);
      this.breakSessions += 1;
    }
  },

  startTimer() {
    this.timer.state = 'running';
    this.timer.tick();
  },

  tick() {
    if(!this.timer.isElapsed) {
    setTimeout(this.tick.bind(this), 60);
    render(this);
    }
    if(this.timer.isElapsed) {
      render(this);
      return;
    }
  },

  pause() {
    let pausedRemaining = this.remainingTime;
    let paused = setTimeout(this.tick);
    clearTimeout(paused);
  },

  resume() {
    let timer = new Timer(pausedRemaining);
  },

  extend() {
  },
};

module.exports = clockodoro;
