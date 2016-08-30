const assert = require('chai').assert;
const Timer = require('../scripts/timer');

describe('Timer', function() {
  let timer = new Timer();

  beforeEach(function() {
    this.rightNow = Date.now();
    this.dateNow = Date.now;
    Date.now = () => this.rightNow;
  });

  afterEach(function() {
    Date.now = this.dateNow;
  });

  context('Timer Defaults', function() {
    it('should be a function', function() {
      assert.isFunction(Timer);
    });

    it('should have a start time property that is null by default', function() {
      assert.isNull(timer.startTime);
    });

    it('should have an end time property that is null by default', function() {
      assert.isNull(timer.endTime);
    });

    it('should have an elapsed time property that is null by default', function() {
      assert.isNull(timer.elapsedTime);
    });

    it('should have a remaining time property that is null by default', function() {
      assert.isNull(timer.elapsedTime);
    });

    it('should have a state property that is null by default', function() {
      assert.isNull(timer.state);
    });

    it('should have a default duration of 25 minutes', function() {
      assert.equal(timer.duration, 25 * 60000);
    });
  });

  context('Timer Properties with Start Time defined', function() {
    beforeEach(function() {
      timer.generateStartTime();
    });

    it('should have a start time defined once the generateStartTime prototype is called', function() {
      assert.equal(timer.startTime, Date.now());
    });

    it('should have an end time defined once the generateStartTime prototype is called', function() {
      assert.equal(timer.endTime, Date.now() + timer.duration);
    });

    it('should have an elapsed time definded once the generateStartTime prototype is called', function() {
      assert.equal(timer.elapsedTime, Date.now() - timer.startTime);
    });

    it('should have a remaining time definded once the generateStartTime prototype is called', function() {
      assert.equal(timer.remainingTime, timer.endTime - Date.now());
    });

    it('should not be elapsed', function() {
      assert.equal(timer.isElapsed, false);
    });

    it('should be elapsed once the duration is complete', function() {
      Date.now = () => timer.endTime;

      assert.equal(timer.isElapsed, true);
    });
  });
});
