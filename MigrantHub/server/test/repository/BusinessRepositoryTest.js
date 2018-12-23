var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var BusinessUser = require('../../models/BusinessUser');
var AccountFactory = require('../factories/AccountFactory');
var BusinessRepository = require('../../repository/BusinessRepository');
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

  it('should create a business and return promise', test(async function () {
    this.stub(BusinessUser.prototype, 'save').returns(Promise.resolve({}));
    try {
        chai.expect(await BusinessRepository.createBusiness(req.body)).should.be.fulfilled;
        assert.calledWith(BusinessUser.prototype.save);
    }catch(error){
        chai.expect(error, false);
    }
  }));

    it('should throw error, since there was a error saving business user', test(async function () {
        this.stub(BusinessUser.prototype, 'save').returns(Promise.reject({}));
        try {
            chai.expect(await BusinessRepository.createBusiness(req.body)).should.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));

    it('should successfully call mongodb findOne business user', test(async function () {
        this.stub(BusinessUser, 'findOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        BusinessRepository.getBusinessUser(req.user._id);
        assert.calledWith(BusinessUser.findOne, { _id: req.user._id });
    }));

    it('should throw error, since there was a error findOne business user', test(async function () {
        this.stub(BusinessUser, 'findOne').returns(Promise.reject({}));
        try {
            chai.expect(await BusinessRepository.getBusinessUser(req.user._id)).should.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));

    it('should successfully call mongodb findOne business user', test(async function () {
        this.stub(BusinessUser, 'findByIdAndUpdate').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        BusinessRepository.editBusinessUser(req.user._id, req.body);
        assert.calledWith(BusinessUser.findByIdAndUpdate, { _id: req.user._id });
    }));

    it('should throw error, since there was a error findByIdAndUpdate business user', test(async function () {
        this.stub(BusinessUser, 'findByIdAndUpdate').returns(Promise.reject({}));
        try {
            chai.expect(await BusinessRepository.editBusinessUser(req.user._id, req.body)).should.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));
});
