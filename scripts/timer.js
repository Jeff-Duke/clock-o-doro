const _globals = require('./_globals');
const render = require('./render');

class Timer {
  constructor(inputTime) {
    this.duration = inputTime || 25;
    this.duration = this.duration * 60000;
    this.startTime = null;
    this.state = null;
  }

  generateStartTime(time = Date.now()) {
    this.startTime = time;
    return this;
  }

  get endTime() {
    if(!this.startTime) {return null;}
    if( this.startTime) {return this.startTime + this.duration;}
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
