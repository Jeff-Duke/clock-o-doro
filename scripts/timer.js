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
    this.tick();
  }

  tick() {
    console.log(this.endTime - Date.now());
    setTimeout(this.tick.bind(this), 60);
  }

  pause() {
    console.log('timer paused');
  }
}




//start(time = Date.now()) {
//this.startTime = time;
//return this;
// }

//get endTime() {
  // if(!this.startTime) { return null; }
// }

//get hasBeenStarted() {
// return !!this.startTime;
//start time is either null or some unix time.  ! takes a truthy and
//!!takes a truthy value and gives you true, return something as a boolean
// }

//get timeRemaining() {
// return this.endTime - Date.now();
// }

// get timeElapsed() {
//   return Date.now() - this.StartTime;
// }

// get isExpired() {

// }
