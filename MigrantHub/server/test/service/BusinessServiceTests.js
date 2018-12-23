var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var BusinessService = require('../../service/BusinessService');
var BusinessRepository = require('../../repository/BusinessRepository');
var AccountFactory = require('../factories/AccountFactory');
var chai = require('chai');


describe('business service', function () {
  let req = {
    body: AccountFactory.validBusinessAccount(),
    user:{
      _id: "test@test.com"
    },
  };

  it('should call getBusinessUser business repository with correct parameters.', test(async function () {
    this.stub(BusinessRepository, 'getBusinessUser');
    BusinessService.getBusinessUser(req.user._id);
    assert.calledWith(await BusinessRepository.getBusinessUser, req.user._id);
  }));

  it('should call editBusinessUser business repository with correct parameters.', test(async function () {
    this.stub(BusinessRepository, 'editBusinessUser');
    BusinessService.editBusinessUser(req.user._id, req.body);
    assert.calledWith(await BusinessRepository.editBusinessUser, req.user._id, req.body);
  }));
});