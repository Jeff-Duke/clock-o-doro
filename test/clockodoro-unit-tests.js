const assert = require('chai').assert;
const Timer = require('../scripts/timer');
const Clockodoro = require('../scripts/clockodoro');

describe('Clockodoro object', function() {
  Clockodoro.generateNewTimer();
  beforeEach(function() {
    this.rightNow = Date.now();
    this.dateNow = Date.now;
    Date.now = () => this.rightNow;
  });

  afterEach(function() {
    Date.now = this.dateNow;
  });

  context('clockodoro methods', function() {

    context('generateNewTimer method', function() {
      it('should be a function', function() {

      });

      it('should create a new work timer if the timers array is empty', function () {

      });

      it('should create a break timer if the most recent timer was a work timer', function() {

      });

      it('should create a new work timer if the most recent timer was a break timer', function() {

      });

      it('should create a long break timer if the most recent timer was a work timer and the last 3 break timers were short breaks', function() {
        
      });

    });

    context('startTimer method', function() {
      it('should have a state of running when started', function() {
        Clockodoro.startTimer();
        assert.equal(Clockodoro.timer.state, 'running');
      });


    });
  });
});
