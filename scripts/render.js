var $ = require('./jquery');
const _globals =  require('./_globals');

function render(timer) {
  _globals.$timerDisplay.html("");
  return _globals.$timerDisplay.append($(`
    <p class="timer-display">${timer.endTime - Date.now()}</p>
    `));
}

module.exports = render;
