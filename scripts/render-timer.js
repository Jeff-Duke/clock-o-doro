const {$, $timerDisplay} = require('./_selectors');

function renderTimer(timer) {
  let seconds = timer.remainingTime / 1000;
  let ss = Math.floor(seconds % 60);
  let mm = Math.floor(seconds / 60) % 60;
  let hh = Math.floor(seconds / 3600) % 100;
  return timer.isWorkTimer ? _renderWorkTimer(hh,mm,ss) : _renderBreakTimer(hh,mm,ss);
}

function _renderWorkTimer(hh,mm,ss) {
  $timerDisplay.html('');
  return $timerDisplay.append($(`
    <p class="work-timer-display">${(hh > 0 ? hh + ":" : '') + (mm < 10 ? "0" + mm: mm) + ":" + (ss < 10 ? "0" + ss : ss)}</p>
    `));
}

function _renderBreakTimer(hh,mm,ss) {

  $timerDisplay.html('');
  return $timerDisplay.append($(`
    <p class="break-timer-display">${(hh > 0 ? hh + ":" : '') + (mm < 10 ? "0" + mm: mm) + ":" + (ss < 10 ? "0" + ss : ss)}</p>
    `));
}

function renderTimerInitially(timer) {
  $timerDisplay.html('');
  let seconds = timer.duration / 1000;
  let ss = Math.floor(seconds % 60);
  let mm = Math.floor(seconds / 60) % 60;
  let hh = Math.floor(seconds / 3600) % 100;
  return $timerDisplay.append($(`
    <p class="base-timer-display">${(hh > 0 ? hh + ":" : '') + (mm < 10 ? "0" + mm: mm) + ":" + (ss < 10 ? "0" + ss : ss)}</p>
    `));
}

module.exports = {
  renderTimer,
  renderTimerInitially
};
