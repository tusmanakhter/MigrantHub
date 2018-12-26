var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var BusinessUser = require('../../models/BusinessUser');
var AccountFactory = require('../factories/AccountFactory');
var BusinessRepository = require('../../repository/BusinessRepository');
var { ServerError } = require('../../errors/ServerError');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('business repository', function () {
  let req = {
    body: AccountFactory.validBusinessAccount(),
    user:{
        _id: "test@test.com"
    },
  };

  it('should create a business and return promise', test(function () {
      this.stub(BusinessUser.prototype, 'save').returns(Promise.resolve({}));
      return chai.assert.isFulfilled(BusinessRepository.createBusiness(req.body), 'Business User has been created.');
  }));

    it('should throw error, since there was a error saving business user', test(function () {
        this.stub(BusinessUser.prototype, 'save').returns(Promise.reject({}));
        return chai.assert.isRejected(BusinessRepository.createBusiness(req.body), ServerError, 'There was an error saving business user.');
    }));

    it('should successfully call mongodb findOne business user', test(function () {
        this.stub(BusinessUser, 'findOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        BusinessRepository.getBusinessUser(req.user._id);
        assert.calledWith(BusinessUser.findOne, { _id: req.user._id });
    }));

    it('should throw error, since there was a error findOne business user', test(function () {
        this.stub(BusinessUser, 'findOne').returns({exec: sinon.stub().returns(Promise.reject({}))});
        return chai.assert.isRejected(BusinessRepository.getBusinessUser(req.user._id), ServerError, 'There was an error retrieving business user.');
    }));

    it('should successfully call mongodb findOne business user', test(function () {
        this.stub(BusinessUser, 'findByIdAndUpdate').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        BusinessRepository.editBusinessUser(req.user._id, req.body);
        assert.calledWith(BusinessUser.findByIdAndUpdate, { _id: req.user._id });
    }));

    it('should throw error, since there was a error findByIdAndUpdate business user', test(function () {
        this.stub(BusinessUser, 'findByIdAndUpdate').returns({exec: sinon.stub().returns(Promise.reject({}))});
        return chai.assert.isRejected(BusinessRepository.editBusinessUser(req.user._id, req.body), ServerError, 'There was an error retrieving updating business user.');
    }));
});
