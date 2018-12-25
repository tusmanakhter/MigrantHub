var { stub, assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var ReviewController = require('../../controllers/ReviewController');
var ReviewFactory = require('../factories/ReviewFactory');
var ServiceFactory = require('../factories/ServiceFactory');
var ReviewService = require('../../service/ReviewService');
var ServiceService = require('../../service/ServiceService');
var { ServerError } = require('../../errors/ServerError');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Review Controller', function () {

    let req = {
        serviceId: "5be7c2e218d96e03298b71c3",
        body: ReviewFactory.validReviewData(),
        user: {
            _id: "test@test.com",
            type: "admin",
        },
    };

    it('should call createReview service with correct parameters', test(async function () {
        this.stub(ServiceService, 'getService').returns(Promise.resolve(ServiceFactory.validServiceData()));
        this.stub(ReviewService, 'getReview').returns(Promise.resolve(null));
        this.stub(ReviewService, 'createReview');
        await ReviewController.createReview(req.user, req.body);
        assert.calledWith(await ServiceService.getService, req.serviceId);
        assert.calledWith(await ReviewService.getReview, req.user, req.serviceId);
        assert.calledWith(await ReviewService.createReview, req.user, req.body);
    }));

    it('should return rejected promise if getService validation fails', test(function () {
        this.stub(ServiceService, 'getService').returns(Promise.reject({}));
        this.stub(ReviewService, 'createReview');
        return chai.assert.isRejected(ReviewController.createReview(req.user, req.body), ServerError, 'Server Errors. Please log out and back in and try again.');

    }));

    it('should return rejected promise if getReview validation fails', test(function () {
        this.stub(ServiceService, 'getService').returns(Promise.resolve(ServiceFactory.validServiceData()));
        this.stub(ReviewService, 'getReview').returns(Promise.reject({}));
        this.stub(ReviewService, 'createReview');
        return chai.assert.isRejected(ReviewController.createReview(req.user, req.body), ServerError, 'Server Errors. Please log out and back in and try again.');

    }));

    it('should call getReviews service with correct parameters', test(async function () {
        this.stub(ReviewService, 'getReviews');
        ReviewController.getReviews('query')
        assert.calledWith(await ReviewService.getReviews, 'query');
    }));

    it('should call deleteReview service with correct parameters', test(async function () {
        this.stub(ReviewService, 'deleteReview');
        ReviewController.deleteReview('review id')
        assert.calledWith(await ReviewService.deleteReview, 'review id');
    }));
});