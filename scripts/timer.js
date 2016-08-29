class Timer {
  constructor(minutes = 25, type = 'work') {
    this.duration = minutes * 60000;
    this.startTime = null;
    this.state = null;
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
    if(!this.startTime) {return null;}
    if( this.startTime) {return Date.now() - this.startTime; }
  }

  get remainingTime() {
    if(!this.startTime) {return null;}
    if( this.startTime) {return this.endTime - Date.now(); }
  }

  get isElapsed() {
    return Date.now() >= this.endTime;
  }
}

module.exports = Timer;
