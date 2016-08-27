const render = require('./render');



// function humanReadable(seconds) {
// var SS = seconds % 60;
// var MM = Math.floor(seconds / 60) % 60;
//
// return (MM < 10 ? "0" + MM: MM) + ":" + (SS < 10 ? "0" + SS : SS);
// }
//
// function timer(minutes) {
//   return humanReadable(minutes * 60);
// }
const Timer = require('./timer');

var timer = new Timer(.1);
console.log(timer);

function showSomething() {
  timer.start();
}

showSomething();
