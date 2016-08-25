const _globals = require('./_globals');
//once seconds === 0 => call the break Timer

//should have a counter that tracks total elapsed intervals
//should have a counter that tracks total elapsed breaks

//if the intervalCounter % 4 !== 0 -> breakTimer(shortBreakMinutes)
//if the intervalCounter % 4 === 0 -> breakTimer(longBreakMinutes)

//by default shortBreak = 5 minutes
          // longBreak = 15 minutes
          // interval = 25 minutes
//should user be able to set the long break?

//we should have a start method that creates a new interval timer based on inputs
//we should have a pause method, called by the pause button
  // pause method stops the timer where it is, calculates remaining time
//we should have a resume method, creates? a new timer with remaining time
//we should have a reset method that resets the counters and starts a new interval timer

//would have a countdown method that reduces seconds by 1 and updates the timer


// class ClockODoro {
//   Timer(duration) {
//     var seconds = duration * 60;
//     console.log(seconds);
//     seconds--;
//     if(seconds >= 0){
//       setTimeout(countDown,1000, seconds);
//     }
//   }
// }
_globals.$startButton.on('click',() => {
  console.log(_globals.$intervalInput.val());
  countDown(parseInt( _globals.$intervalInput.val() * 60));
});

function countDown(seconds){
  console.log(seconds);
  seconds--;
  if(seconds >= 0){
   setTimeout(countDown,1000, seconds );
  }
}
