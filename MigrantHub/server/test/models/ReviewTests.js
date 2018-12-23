var chai = require('chai');
var expect = chai.expect;
var Review = require('../../models/Review');

describe('Review Services model', function() {
    it('Should be invalid if user, serviceId, rating, or comment is empty', function(done) {
        var review = new Review();

        review.validate(function(err) {
            expect(err.errors.user).to.exist;
            expect(err.errors.serviceId).to.exist;
            expect(err.errors.rating).to.exist;
            expect(err.errors.comment).to.exist;
            done();
        });
    });
});