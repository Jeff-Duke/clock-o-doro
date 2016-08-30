const Timer = require('./timer');
const { $, $workInput, $breakInput, $timerDisplay } = require('./_selectors');

  const Clockodoro = {
  workDuration: $workInput.val() || 0.5,
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
    let newBreakTimer = new Timer(this.breakDuration, 'break');
    this._addToTimers(newBreakTimer);
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

  renderTimer() {
    return (this.timer.isWorkTimer) ? this._renderWorkTimer() : this._renderBreakTimer();
  },

  renderInitialTimer() {
    $timerDisplay.html('');
    return $timerDisplay.append($(`
      <p class="base-timer-display">${this.timer.duration}</p>
      `));
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
      <p class="break-timer-display">${this.timer.remainingTimer}</p>
      `));
  },

  _tick() {
    this.renderTimer();
    return this.timer.isElapsed ? this.generateNewTimer() : setTimeout(this._tick.bind(this), 50);
  },
};

module.exports = Clockodoro;
