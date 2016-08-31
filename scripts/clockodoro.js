const Timer = require('./timer');
const { $, $workInput, $breakInput, $timerDisplay } = require('./_selectors');

const Clockodoro = {
  workDuration: $workInput.val() || 25,
  breakDuration: $breakInput.val() || 5,
  timers: [],
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
    }
  },

  renderTimer() {
    return this.timer.isWorkTimer ? this._renderWorkTimer() : this._renderBreakTimer();
  },

  _renderWorkTimer() {
    $timerDisplay.html('');
    return $timerDisplay.append($(`
      <p class="work-timer-display">${this.timer.remainingTime}</p>
      `));
  },

  _renderBreakTimer() {
    $timerDisplay.html('');
    return $timerDisplay.append($(`
      <p class="break-timer-display">${this.timer.remainingTime}</p>
      `));
  },

  renderTimerInitially() {
    $timerDisplay.html('');
    return $timerDisplay.append($(`
      <p class="base-timer-display">${this.timer.duration}</p>
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
