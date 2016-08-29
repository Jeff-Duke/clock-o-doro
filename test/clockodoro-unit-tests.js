const assert = require('chai').assert;
const Timer = require('../scripts/timer');
const Clockodoro = require('../scripts/clockodoro');

describe('Clockodoro object', function() {
  // Clockodoro.generateNewTimer();

  let tickCount = 0;

  beforeEach(function() {
    this.rightNow = Date.now();
    this.dateNow = Date.now;
    Date.now = () => this.rightNow;
    const tick = Clockodoro.tick;
    Clockodoro.tick = () => { tickCount++; tick(); }
  });

  afterEach(function() {
    Date.now = this.dateNow;
  });

    context('clockodoro methods', function() {

    it.skip('should have the end time extended by 3 minutes if extend is called', function() {
      let originalEnd = Clockodoro.timer.endTime;
      Clockodoro.timer.extend();
      assert.equal(Clockodoro.timer.endTime = originalEnd + 180000);
    });

    it('should have a state of running when started', function() {
      Clockodoro.intervalDuration = 25;
      Clockodoro.breakDuration = 5;
      Clockodoro.generateNewTimer();
      Clockodoro.startTimer();
      assert.equal(Clockodoro.timer.state, 'running');
    });

    it.skip('should have a state of paused when paused', function() {
      Clockodoro.generateNewTimer();
      Clockodoro.startTimer();
      assert.equal(Clockodoro.timer.state, 'paused');
    });
  });
});
