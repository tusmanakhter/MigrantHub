var { spy, stub, assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var ReviewController = require('../../controllers/ReviewController')
var ReviewFactory = require('../factories/ReviewFactory');
var Review = require('../../models/Review');
var User = require('../../models/User');

describe('Review Controller', function () {

    let req = {
            serviceId: "5be7c2e218d96e03298b71c3",
            body: {
                serviceDetails: ReviewFactory.validReviewData()
            },
            user: {
                _id: "test@test.com",
                type: "admin",
            },
            params: {
                id: "5bda52305ccfd051484ea790",
            },
        },
        error = new Error({ error: "err" }),
        res = {};

    beforeEach(function () {
        status = stub();
        send = spy();
        res = { send, status };
        status.returns(res);
    });
  
    it('should return error message if error finding reviews', test(function () {
        this.stub(Review, 'find').yields(error);
        ReviewController.getReviews(req, res);
        assert.calledWith(Review.find);
        assert.calledWith(res.send, "There was an error getting reviews.");
    }));

    it('should find the reviews with no error', test(function () {
        this.stub(Review, 'find').yields(null);
        ReviewController.getReviews(req, res);
        assert.calledWith(Review.find);
        assert.calledWith(res.send);
    }));

    it('should delete a review', test(async function () {
        this.stub(Review, 'findOne').returns(null);
        this.stub(User, 'findOne').returns(req.user);
        this.stub(Review, 'deleteOne').yields(null);
        ReviewController.deleteReview(req, res);
        assert.calledWith(await Review.deleteOne, { _id: "5bda52305ccfd051484ea790" });
        assert.calledWith(res.send);
    }));
});