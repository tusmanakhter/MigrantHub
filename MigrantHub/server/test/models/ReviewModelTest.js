var expect = require('chai').expect;

var Review = require('../../models/Review');

describe('Review', function() {
  it('should be invalid if user, firstName, lastName, serviceId, rating or comment is empty', function(done) {
    var review = new Review();

    review.validate(function(err) {
      expect(err.errors.user).to.exist;
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.serviceId).to.exist;
      expect(err.errors.rating).to.exist;
      expect(err.errors.comment).to.exist;
      done();
      });
  });
});