var expect = require('chai').expect;

var SavedJob = require('../../models/SavedJob');

describe('Bug', function() {
  it('should be invalid if _id or savedList._id is empty', function(done) {
    var savedJob = new SavedJob();

    savedJob.validate(function(err) {
      expect(err.errors._id).to.exist;
      done();
      });
  });
});