```javascript
 class/constructor

 class Timer {
   constructor() {
    start()
    start time = date.now
    duration(constructor)
    endtime
    timeRemaining -
    timeElapsed - current time + start time
    isExpired (is date.now<endtime)
   }
 }
```

write unit tests for the timer itself
```javascript
  Timer
  should be a function
  should take a duration property
  should take the originalduration prop?(show the user what the originalDuration was)
  should have a start time of null
  should have an end time of null
  has a hasBeenStarted property
   Start()
    set the StartTime property to a number
    set the endTime property to the sum of startTime and endTime
  timeRemaining
    should show the difference between the start time and the end time
  timeElapsed
    should show the difference between current time and end time
```

feature/integration tests to see that when the start button is pushed something is on the screen
```javascript
 renderTimer()
  takes a timer and a DOM element and displays the timer in the DOM element

 setTimeout(function tick() {
   const [currentTimer] = timers;

   if (currentTimer && !currentTimer.isElapsed) {
     renderTimer(currentTimer, $timerElement);
   }
   setTimeout(tick,60);
 }, 60);

 function demonstrateTimerDrift() {
   const now = Date.now();
   setTimeout(() => { console.log(Date.now() - now), 1000});
 }


 renderTimer(timer, element)
  convert timer to human readable
   spit out html to element


timer
  constructor(duration) {
  this.duration = duration
  this.originalDuration = duration;
  this.startTime = null
 }

  start(time = Date.now()) {
  this.startTime = time;
  return this;
 }

  get endTime() {
     if(!this.startTime) { return null; }
 }

  get hasBeenStarted() {
   return !!this.startTime;
  start time is either null or some unix time.  ! takes a truthy and
  !!takes a truthy value and gives you true, return something as a boolean
 }

  get timeRemaining() {
   return this.endTime - Date.now();
 }

   get timeElapsed() {
     return Date.now() - this.StartTime;
 }

   get isExpired() {

 }




 should set the endtime property to the sum of starttime and duration
 const duration - 1000
 const timer - new timer(duration);
 timer.start();
 const expectedEndTime - timer.startTime + duration;

 assert.equal(timer.endtime, expectedEndTime)

 describe('timeRemaining', () => {

 (MOCHA)  beforeEach(() => {
     this.rightNow = Date.now();
     this.dateNow = Date.now;
     Date.now = () => this.rightNow;
   });

  (MOCHA) afterEach(() => {
     Date.now = this.dateNow;
   });
 });

 it('should show the difference between the start time and the end time', () =>)
  const now = Date.now();
  const duration = 1000;
  const start = now - duration / 2
  const expectedEndTime = now + duration /2;
  const expectedTimeRemaining = expectedEndTime - now;
  const timer = new Timer(duration);
  const timeElapsed -

math.floor remaining
math.ceil elapsed
npm install moment --save  (Moment will give you time and date format happiness)
```
