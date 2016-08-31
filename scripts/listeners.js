const { $, $startButton, $setWorkButton, $setBreakButton, $workInput, $breakInput } = require ('./_selectors');
const Clockodoro = require ('./clockodoro');

$(document).ready(function() {
  Clockodoro.generateNewTimer();
  Clockodoro.renderTimerInitially();
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

$('#sound-button').on('click', function() {
  Clockodoro.playSound();
});
