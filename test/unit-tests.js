const assert = require('chai').assert;
const Chat = require('../../lib/scripts/chatroom');
const ChatRoom = require('../../lib/scripts/chatroom');
const _globals = require('../../scripts/global-variables');

//write unit tests for the timer itself
//  Timer
  //should be a function
  //should take a duration property
  //should take the originalduration prop?(show the user what the originalDuration was)
  //should have a start time of null
  //should have an end time of null
  //has a hasBeenStarted property
  // Start()
    //set the StartTime property to a number
    //set the endTime property to the sum of startTime and endTime
  //timeRemaining
    //should show the difference between the start time and the end time
  //timeElapsed
    //should show the difference between current time and end time

describe('Timer object and methods', function() {
  context('')
  it.skip('should create a new message when generateNewMessage() is called', function(username,message) {
    ChatRoom.generateNewMessage(username='test', message='hello');
    assert.equal('.user-message', true);
  });
