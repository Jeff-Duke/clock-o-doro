const { $, $startButton, $setWorkButton, $setBreakButton, $workInput, $breakInput } = require ('./_selectors');
const Clockodoro = require ('./clockodoro');
const { renderTimerInitially } = require('./render-timer');

$(document).ready(function() {
  Clockodoro.generateNewTimer();
  renderTimerInitially(Clockodoro.timer);
});

$startButton.on('click', function() {
  Clockodoro.startTimer();
});

$setWorkButton.on('click', function() {
  Clockodoro.setWorkDuration($workInput.val());
});

$setBreakButton.on('click', function() {
  Clockodoro.setBreakDuration($breakInput.val());
});
