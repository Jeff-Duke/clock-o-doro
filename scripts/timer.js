class Timer {
  constructor(minutes = 25, type = 'work') {
    this.duration = minutes * 60000;
    this.startTime = null;
    this.state = null;
    this.type = type;
  }

  get isWorkTimer() {
    return this.type === 'work';
  }

  get isBreakTimer() {
    return this.type === 'break';
  }

  generateStartTime(time = Date.now()) {
    this.startTime = time;
    return this;
  }

  get endTime() {
    return this.startTime ?  this.startTime + this.duration : null;
  }

  get elapsedTime() {
    return this.startTime ? Date.now() - this.startTime : null;
  }

  get remainingTime() {
    return this.startTime ? this.endTime - Date.now() : null;
  }

  get isElapsed() {
    return Date.now() >= this.endTime;
  }
}

module.exports = Timer;
