class Timer {
  constructor(sandwich) {
    this.duration = sandwich || 1;
    this.duration = this.duration * 60000;
    this.startTime = Date.now();
    this.endTime = this.startTime + this.duration;
    this.elapsedTime = Date.now() - this.startTime;
    this.remainingTime = this.endTime - Date.now();
  }

  start() {
    console.log('timer started');
    console.log('start time: ' + this.startTime);
  }

  tick() {
    console.log(this.endTime - Date.now());
    setTimeout(this.tick.bind(this), 60);
  }

  pause() {
    console.log('timer paused');
  }
}
