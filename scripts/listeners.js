const { $, $startButton, $setWorkButton, $setBreakButton } = require ('./_selectors');
const Clockodoro = require ('./clockodoro');

$(document).ready(function() {
  Clockodoro.generateNewTimer();
  Clockodoro.renderInitialTimer();
});

$startButton.on('click', function() {
  Clockodoro.startTimer();
});

$setWorkButton.on('click', function() {
  Clockodoro.setWorkDuration(minutes);
});

$setBreakButton.on('click', function() {
  Clockodoro.setBreakDuration(minutes);
});
