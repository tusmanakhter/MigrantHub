var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var ReviewRepository = require('../../repository/ReviewRepository');
var ReviewFactory = require('../factories/ReviewFactory');
var Review = require('../../models/Review');
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
        ReviewRepository.createReview(req.user._id, req.body);
        assert.calledWith(Review.prototype.save);
    }));

    it('should throw error, since there was a error saving review', test(async function () {
        this.stub(Review.prototype, 'save').returns(Promise.reject({}));
        try {
            chai.expect(await ReviewRepository.createReview(req.user._id, req.body)).should.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));

    it('should successfully call mongodb findOne to findOne review', test(function () {
        this.stub(Review, 'findOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        ReviewRepository.getReview({ _id: req.body._id, deleted: false });
        assert.calledWith(Review.findOne, { _id: req.body._id, deleted: false });
    }));

    it('should throw error, since there was a error getting review', test(async function () {
        this.stub(Review, 'findOne').returns(Promise.reject({}));
        try {
            chai.expect(await ReviewRepository.getReview({ _id: req.body._id, deleted: false })).should.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));

    it('should successfully call mongodb find to getReviews', test(function () {
        this.stub(Review, 'find').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        ReviewRepository.getReviews({serviceId: '5bda52305ccfd051484ea790', deleted: false});
        assert.calledWith(Review.find, {serviceId: '5bda52305ccfd051484ea790', deleted: false});
    }));

    it('should throw error, since there was a error getting all reviews', test(async function () {
        this.stub(Review, 'find').returns(Promise.reject({}));
        try {
            chai.expect(await ReviewRepository.getServices({serviceId: '5bda52305ccfd051484ea790', deleted: false})).should.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));

    it('should successfully call mongodb updateOne to deleteReview', test(async function () {
        this.stub(Review, 'updateOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        this.stub(Date, 'now').returns('2018-12-19T00:32:22.749Z');
        ReviewRepository.deleteReview(req.body._id);
        assert.calledWith(Review.updateOne, { _id: req.body._id }, { deleted: true, deletedDate: Date.now() });
    }));

    it('should throw error, since there was a error deleting review', test(async function () {
        this.stub(Review, 'updateOne').returns(Promise.reject({}));
        try {
            chai.expect(await ReviewRepository.deleteReview(req.body._id)).should.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));
});