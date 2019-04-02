var expect = require('chai').expect;

var Bug = require('../../models/Bug');

describe('Bug', function() {
  it('should be invalid if user, bugName, description or dateCreated is empty', function(done) {
    var bug = new Bug();

    bug.validate(function(err) {
      expect(err.errors.user).to.exist;
      expect(err.errors.bugName).to.exist;
      expect(err.errors.description).to.exist;
      expect(err.errors.dateCreated).to.exist;
      done();
      });
  });
});