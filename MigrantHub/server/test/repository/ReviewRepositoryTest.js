var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var ReviewRepository = require('../../repository/ReviewRepository');
var ReviewFactory = require('../factories/ReviewFactory');
var Review = require('../../models/Review');
var { ServerError } = require('../../errors/ServerError');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Service Repository', function () {
    let req = {
        body: ReviewFactory.validReviewData(),
        user:{
            _id: "test@test.com",
        }
    };

    it('should successfully call mongodb save to createReview', test(function () {
        this.stub(Review.prototype, 'save').returns(Promise.resolve({}));
        return chai.assert.isFulfilled(ReviewRepository.createReview(req.user._id, req.body), 'Review has been created.');
    }));

    it('should throw error, since there was a error saving review', test(function () {
        this.stub(Review.prototype, 'save').returns(Promise.reject({}));
        return chai.assert.isRejected(ReviewRepository.createReview(req.user._id, req.body), ServerError, 'There was an error creating the review.');
    }));

    it('should successfully call mongodb findOne to findOne review', test(function () {
        this.stub(Review, 'findOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        ReviewRepository.getReview({ _id: req.body._id, deleted: false });
        assert.calledWith(Review.findOne, { _id: req.body._id, deleted: false });
    }));

    it('should throw error, since there was a error getting review', test(function () {
        this.stub(Review, 'findOne').returns({exec: sinon.stub().returns(Promise.reject({}))});
        return chai.assert.isRejected(ReviewRepository.getReview({ _id: req.body._id, deleted: false }), ServerError, 'There was an error retrieving review.');
    }));

    it('should successfully call mongodb find to getReviews', test(function () {
        this.stub(Review, 'find').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        ReviewRepository.getReviews({serviceId: '5bda52305ccfd051484ea790', deleted: false});
        assert.calledWith(Review.find, {serviceId: '5bda52305ccfd051484ea790', deleted: false});
    }));

    it('should throw error, since there was a error getting all reviews', test(function () {
        this.stub(Review, 'find').returns({exec: sinon.stub().returns(Promise.reject({}))});
        return chai.assert.isRejected(ReviewRepository.getReviews({serviceId: '5bda52305ccfd051484ea790', deleted: false}), ServerError, 'There was an error getting reviews.');
    }));

    it('should successfully call mongodb updateOne to deleteReview', test(function () {
        this.stub(Review, 'updateOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        this.stub(Date, 'now').returns('2018-12-19T00:32:22.749Z');
        ReviewRepository.deleteReview(req.body._id);
        assert.calledWith(Review.updateOne, { _id: req.body._id }, { deleted: true, deletedDate: Date.now() });
    }));

    it('should throw error, since there was a error deleting review', test(function () {
        this.stub(Review, 'updateOne').returns({exec: sinon.stub().returns(Promise.reject({}))});
        return chai.assert.isRejected(ReviewRepository.deleteReview(req.body._id), ServerError, 'There was an error deleting review.');
    }));
});