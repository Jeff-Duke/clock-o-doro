const assert = require('chai').assert;
// const _globals = require('../../scripts/_globals.js');
const Timer = require('../scripts/timer');

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

  it('should be a function', function() {
    assert.isFunction(Timer);
  });

  it('should have a start time that is not null', function() {
    assert.isNotNull(timer.startTime);
  });

  it('should have an end time that is not null', function() {
    assert.isNotNull(timer.endTime);
  });

});

describe('Timer methods', function() {
  var timer = new Timer();
  beforeEach(function() {
    this.rightNow = Date.now();
    this.dateNow = Date.now;
    Date.now = () => this.rightNow;
  });

  afterEach(function() {
    Date.now = this.dateNow;
  });

  context('Start method', function() {
    it('should be a function', function() {
      assert.isFunction(timer.start);
    });

    it('should capture the moment of UNIX time in which it was envoked')
  });


});








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
