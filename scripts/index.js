require('./clockodoro');

function demonstrateCountdown(duration) {
  const startTime = Date.now();
  const endTime = startTime + duration;
  console.log('Hi');
  setTimeout(function tick() {
    const now = Date.now();
    if (now < endTime) {
      console.log(Math.floor((endTime - now) / 1000));
      setTimeout(tick, 1000);
    }
  }, 0);
}

demonstrateCountdown(10000);
