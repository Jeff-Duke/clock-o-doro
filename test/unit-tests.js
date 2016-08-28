const assert = require('chai').assert;
const Timer = require('../scripts/timer');
const clockodoro = require('../scripts/clockodoro');

describe('Timer', function() {
  var timer = new Timer();

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

    it.skip('should have the end time extended by 3 minutes if extend is called', function() {
      var originalEnd = timer.endTime;
      timer.extend();
      assert.equal(timer.endTime = originalEnd + 180000);
    });

    it('should be elapsed once the duration is complete', function() {
      Date.now = () => this.rightNow + timer.duration;
      assert.equal(timer.isElapsed, true);
    });

    it('should have a state of running when started', function() {
      debugger;
      timer.startTimer();
      assert.equal(timer.state, 'running');
    });

    it('should have a state of paused when paused', function() {

    });

  });

});




//
// describe('Timer methods', function() {
//   var timer = new Timer();
//   beforeEach(function() {
//     this.rightNow = Date.now();
//     this.dateNow = Date.now;
//     Date.now = () => this.rightNow;
//   });
//
//   afterEach(function() {
//     Date.now = this.dateNow;
//   });
//
//   context('Start method', function() {
//     it.skip('should be a function', function() {
//       assert.isFunction(timer.start);
//     });
//
//     // it.skip('should capture the moment of UNIX time in which it.skip was envoked')
//   });
//
//
// });


 //  context('should start and end', function(){
 //   it('should be a function', function() {
 //     assert.isFunction(Timer);
 //   });
 //
 //   it('should return null if there is not a given start time', function() {
 //     var returned = timer.end();
 //     assert.isNull(returned);
 //   });
 //
 //   it('should have a start time equal to date.now', function() {
 //     var start = timer.start();
 //     var expected = Date.now();
 //     assert.equal(start, expected);
 //   });
 //
 //   it('should return the end time if given a start time', function(){
 //     timer.start();
 //     var end = timer.end();
 //     var expected = Date.now() + timer.duration;
 //     assert.equal(end, expected);
 //   });
 // });


//
// //write unit tests for the timer itself
// //  Timer
//   //should be a function
//   //should take a duration property
//   //should take the originalduration prop?(show the user what the originalDuration was)
//   //should have a start time of null
//   //should have an end time of null
//   //has a hasBeenStarted property
//   // Start()
//     //set the StartTime property to a number
//     //set the endTime property to the sum of startTime and endTime
//   //timeRemaining
//     //should show the difference between the start time and the end time
//   //timeElapsed
//     //should show the difference between current time and end time
//
// describe('Timer object and methods', function() {
//   context('')
//   it.skip('should create a new message when generateNewMessage() is called', function(username,message) {
//     ChatRoom.generateNewMessage(username='test', message='hello');
//     assert.equal('.user-message', true);
//   });
