const { $, $startButton } = require ('./_selectors');
const Clockodoro = require ('./clockodoro');

$(document).ready(function() {
  Clockodoro.generateNewTimer();
  Clockodoro.renderInitialTimer();
});

$startButton.on('click', function() {
  Clockodoro.startTimer();
});
