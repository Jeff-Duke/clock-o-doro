/* globals browser */

const assert =  require('assert');

describe('Clockodoro', function() {
  browser.url('/index.html');

  context('Inputs', function() {

    it('should have a work duration input field', function() {
      let workDurationInput = browser.isExisting('#work-input');
      assert.equal(workDurationInput, true);
    });

    it('should have a break duration input field', function() {
      let breakDurationInput = browser.isExisting('#break-input');
      assert.equal(breakDurationInput, true);
    });

    it('should have a set work duration button', function() {
      let setWorkDurationButton = browser.isExisting('#set-work-duration-button');
      assert.equal(setWorkDurationButton, true);
    });

    it('should have a set break duration button', function() {
      let setBreakButton = browser.isExisting('#set-break-duration-button');
      assert.equal(setBreakButton, true);
    });

    it('should have a start button', function() {
      let startButton = browser.isExisting('#start-button');
      assert.equal(startButton, true);
    });

    it('should have a timer display area', function() {
      let timerDisplay = browser.isExisting('#timer-display');
      assert.equal(timerDisplay, true);
    });

  });

  context('Input Tests', function() {

    it('should take a new work duration in the set work duration field, and change the timer when the set work duration button is clicked', function() {
        let workDurationInput = browser.element('#work-input');

        workDurationInput.setValue(10);
        browser.click('#set-work-duration-button');

        let timerDisplay = browser.getValue('#timer-display');
        assert.equal(timerDisplay, '10:00');
    });

    it.skip('should take a new break duration in the set break duration field, and change the timer when the set break duration button is clicked', function() {
      let workDurationInput = browser.element('#work-input');
      let breakDurationInput = browser.element('#break-input');

      workDurationInput.setValue(0.01);
      browser.click('#set-work-duration-button');
      breakDurationInput.setValue(30);
      browser.click('#set-break-duration-button');
      browser.click('#start-button');
      browser.waitForVisible('break-timer-display', 2000);
    });

    it.skip('should start counting down when the start button is clicked', function() {
      let startButton = browser.element('#start-button');
      let timerDisplay = browser.element('#timer-display');

      assert.equal(timerDisplay, '25:00');
      browser.click(startButton);
      assert.equal(timerDisplay, '24:59');
    });

  });
});
