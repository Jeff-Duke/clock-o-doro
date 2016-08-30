const assert = require('chai').assert;
const Clockodoro = require('../scripts/clockodoro');

describe('Clockodoro object', function() {

  beforeEach(function() {
    this.rightNow = Date.now();
    this.dateNow = Date.now;
    Date.now = () => this.rightNow;
    Clockodoro.timers = [];
  });

  afterEach(function() {
    Date.now = this.dateNow;
  });

  context('clockodoro methods', function() {

    context('generateNewTimer method', function() {
      it('should be a function', function() {
        assert.isFunction(Clockodoro.generateNewTimer);
      });

      it('should create a new work timer if the timers array is empty', function () {
        Clockodoro.generateNewTimer();
        assert.equal(Clockodoro.timer.type, 'work');
      });

      it('should create a break timer if the most recent timer was a work timer', function() {
        while (Clockodoro.timers.length < 2) { Clockodoro.generateNewTimer(); }
        assert.equal(Clockodoro.timer.type, 'break');
      });

      it('should create a new work timer if the most recent timer was a break timer', function() {
        while (Clockodoro.timers.length < 3) { Clockodoro.generateNewTimer(); }
        assert.equal(Clockodoro.timer.type, 'work');
      });

      it('should create a long break timer if the most recent timer was a work timer AND the last 3 break timers were short breaks', function() {
        while (Clockodoro.timers.length < 8) { Clockodoro.generateNewTimer(); }
        assert.equal(Clockodoro.timer.duration, Clockodoro.breakDuration * 60000 * 3);
      });
      
    });

    context('startTimer method', function() {
      it('should have a state of running when started', function() {
        Clockodoro.generateNewTimer();
        Clockodoro.startTimer();
        assert.equal(Clockodoro.timer.state, 'running');
      });
    });
  });
});
