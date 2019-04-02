var expect = require('chai').expect;

var PinnedService = require('../../models/PinnedService');

describe('PinnedService', function() {
  it('should be invalid if _id is empty', function(done) {
    var pinnedService = new PinnedService();
    pinnedService.validate(function(err) {
      expect(err.errors._id).to.exist;
      done();
      });
  });
});