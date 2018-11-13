var chai = require('chai');
var expect = chai.expect;
var ReviewService = require('../../models/ReviewService');

describe('Review Services model', function() {
    it('Should be invalid if user, serviceId, rating, or comment is empty', function(done) {
        var reviewService = new ReviewService();

        reviewService.validate(function(err) {
            expect(err.errors.user).to.exist;
            expect(err.errors.serviceId).to.exist;
            expect(err.errors.rating).to.exist;
            expect(err.errors.comment).to.exist;
            done();
        });
    });
});