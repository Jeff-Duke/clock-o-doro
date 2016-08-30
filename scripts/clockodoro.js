var $ = require('./jquery');
const Timer = require('./timer');
const { $workInput, $breakInput, $timerDisplay } = require('./_selectors');

  const Clockodoro = {
  workDuration: $workInput.val() || 25,
  breakDuration: $breakInput.val() || 5,
  timers: [],
  get workSessions() { return this.timers.filter(t => t.isWorkTimer).length; },
  get breakSessions() { return this.timers.filter(t => t.isBreakTimer).length; },
  get timer() { return this.timers[0]; },

  generateNewTimer: function() {
    if (this.timer && this.timer.type=== 'work') { this._generateBreakTimer(); }
    else { this._generateWorkTimer(); }
  },

  _generateWorkTimer: function() {
    let workTimer = new Timer(this.workDuration, 'work');
    this._addToTimers(workTimer);
  },

  _generateBreakTimer: function() {
    if(this.breakSessions % 3 === 0 && this.breakSessions > 1) { this._generateLongBreakTimer(); }
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

  renderWorkTimer() {
    $timerDisplay.html('');
    return $timerDisplay.append($(`
      <p class="work-timer-display">${this.timer.remainingTime}</p>
      `));
  },

  renderBreakTimer() {
    $timerDisplay.html('');
    return $timerDisplay.append($(`
      <p class="break-timer-display">${this.timer.remainingTimer}</p>
      `));
  },

  _tick() {
    if (this.timer.type === 'work') { this.renderWorkTimer(); }
    if (this.timer.type === 'break') { this.renderBreakTimer(); }

    if(!this.timer.isElapsed) {
      setTimeout(this._tick.bind(this), 60);
    } else {
      this.generateNewTimer();
    }
  },
};

module.exports = Clockodoro;
