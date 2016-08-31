const assert = require('chai').assert;
const Clockodoro = require('../scripts/clockodoro');
const {$, $breakInput, $workInput} = require('../scripts/_selectors');

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
        while (Clockodoro.timers.length < 10) { Clockodoro.generateNewTimer(); }
        assert.equal(Clockodoro.timer.duration, Clockodoro.breakDuration * 60000 * 3);
      });

      it('should create another long break timer after 2 cycles', function() {
        while (Clockodoro.timers.length < 18) { Clockodoro.generateNewTimer(); }
        assert.equal(Clockodoro.timer.duration, Clockodoro.breakDuration * 60000 * 3);
      });

    });

    context('startTimer method', function() {
      beforeEach(function() {
        Clockodoro.generateNewTimer();
        Clockodoro.startTimer();
      });

      it('should have a state of running when started', function() {
        assert.equal(Clockodoro.timer.state, 'running');
      });

      it('should generate a start time on the timer when the startTimer method is called', function() {
        assert.equal(Clockodoro.timer.startTime, Date.now());
      });

      it('should generate an end time on the timer when the startTimer method is called', function() {
        assert.equal(Clockodoro.timer.endTime, Date.now() + Clockodoro.timer.duration);
      });

      it('should generate a remaining time on the timer when the startTimer method is called', function() {
        assert.equal(Clockodoro.timer.remainingTime, Clockodoro.timer.endTime - Date.now());
      });

      it('should be able to start the 2nd timer', function() {
        Clockodoro.generateNewTimer();
        this.rightNow += Clockodoro.timer.duration;
        assert.equal(Clockodoro.timer.isElapsed, true);
        assert.equal(Clockodoro.timers.length, 2);
        Clockodoro.startTimer();
        assert.equal(Clockodoro.timer.isElapsed, false);
        assert.equal(Clockodoro.timer.state, 'running');
      });

    });
    context('setWorkDuration and setBreakDuration methods', function() {
      beforeEach(function() {
        Clockodoro.generateNewTimer();
      });
      afterEach(function() {
        Clockodoro.timers = [];
        Clockodoro.workDuration = 25;
        Clockodoro.breakDuration = 5;
      });

      it('should update the work-duration if setWorkDuration is called', function() {
        Clockodoro.setWorkDuration(60);
        assert.equal(Clockodoro.workDuration, 60);
      });

      it('should throw out the current timer if it is a work timer, and the timer is not running, and create a new work timer with the defined work duration value if setWorkDuration is called', function() {
        Clockodoro.setWorkDuration(60);
        assert.equal(Clockodoro.timers.length, 1);
        assert.equal(Clockodoro.timer.type, 'work');
        assert.equal(Clockodoro.timer.duration, 60 * 60000);
      });

      it('should update the break-duration if setBreakDuration is called', function() {
        Clockodoro.setBreakDuration(10);
        assert.equal(Clockodoro.breakDuration, 10);
      });

      it('should throw out the current timer if it is a break timer, is not running, and create a new break timer with the defined break duration value if setBreakDuration is called', function() {
        while(Clockodoro.timers.length < 2) { Clockodoro.generateNewTimer(); }
        assert.equal(Clockodoro.timer.isBreakTimer, true);
        Clockodoro.setBreakDuration(10);
        assert.equal(Clockodoro.timers.length, 2);
        assert.equal(Clockodoro.breakDuration, 10);
        assert.equal(Clockodoro.timer.duration, 10 * 60000);

      });

    });
  });
});
