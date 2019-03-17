var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var ReviewService = require('../../service/ReviewService');
var ReviewRepository = require('../../repository/ReviewRepository');
var ReviewFactory = require('../factories/ReviewFactory');
var ReviewValidator = require('../../validators/ReviewValidator');
var { ServerError } = require('../../errors/ServerError');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Service Service', function () {
    let req = {
            body: ReviewFactory.validReviewData(),
            user: {
                _id: "test@test.com"
            },
            query: {
                _id: "5bda52305ccfd051484ea790",
                editOwner: "test@test.com",
                search: true,
                searchQuery: 'test',
            },
            params: {
                id: "5bda52305ccfd051484ea790"
            }
        },
        service = {
            _id: "5bda52305ccfd051484ea790",
            email: "test@hotmail.com"
        };

    it('should call createReview repository with correct parameters', test(async function () {
        this.stub(ReviewRepository, 'createReview');
        this.stub(ReviewValidator, 'reviewValidator').returns('');
        await ReviewService.createReview(req.user, req.body);
        assert.calledWith(ReviewRepository.createReview, req.user._id, req.body);
    }));

    it('should call createReview repository with error in validation', test(function () {
        this.stub(ReviewRepository, 'createReview');
        this.stub(ReviewValidator, 'reviewValidator').returns("error");
        return chai.assert.isRejected(ReviewService.createReview(req.user._id, req.body), ServerError, 'There was an error creating the review.');
    }));

    it('should call getReview repository with correct parameters', test(async function () {
        this.stub(ReviewRepository, 'getReview');
        await ReviewService.getReview(req.user, service._id);
        assert.calledWith(ReviewRepository.getReview, { deleted: false, serviceId: '5bda52305ccfd051484ea790', user: 'test@test.com' } );
    }));

    it('should call getReview service with correct parameters', test(async function () {
      this.stub(ReviewService, 'getReview').returns(Promise.resolve({}));
      chai.assert.isFulfilled(ReviewService.reviewExists(req.user, service._id), 'Review Exists.');
    }));

    it('should call getReview service with correct parameters', test(async function () {
      this.stub(ReviewService, 'getReview').returns(Promise.reject({}));
      chai.assert.isRejected(ReviewService.reviewExists(req.user, service._id), ServerError, 'Review does not exist.');
    }));

    it('should call getReviews with correct parameters', test(async function () {
        this.stub(ReviewRepository, 'getReviews');
        await ReviewService.getReviews({serviceId: '5bda52305ccfd051484ea790', deleted: false});
        assert.calledWith(ReviewRepository.getReviews, {serviceId: '5bda52305ccfd051484ea790', deleted: false});
    }));

    it('should call deleteReview repository with correct parameters', test(async function () {
        this.stub(ReviewRepository, 'deleteReview');
        await ReviewService.deleteReview(req.body._id);
        assert.calledWith(ReviewRepository.deleteReview, req.body._id);
    }));
});