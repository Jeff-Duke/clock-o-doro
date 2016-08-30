var $ = require('./jquery');
const Clockodoro = require('./clockodoro');
const { $timerDisplay } =  require('./_selectors');

function renderTimer() {
//   $timerDisplay.html("");
//   return $timerDisplay.append($(`
//     debugger;
//     <p class="timer-display">${Clockodoro.timer.remainingTime}</p>
//     `));
}

module.exports = renderTimer;
