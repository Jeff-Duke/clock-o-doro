const assert =  require('assert');

describe('clockodoro', function() {
  browser.url('/index.html');

  context('input tests', function() {
    it('should have a work duration input field', function() {
      let workDurationInput = browser.isExisting('#message-duration-input');
      assert.equal(workDurationInput, true);
    });
  });
});
