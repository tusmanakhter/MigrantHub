var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var BusinessService = require('../../service/BusinessService');
var BusinessRepository = require('../../repository/BusinessRepository');
var AccountFactory = require('../factories/AccountFactory');

describe('business service', function () {
  let req = {
    body: AccountFactory.validBusinessAccount(),
    user:{
      _id: "test@test.com"
    },
  };

  it('should call getBusinessUser business repository with correct parameters.', test(async function () {
    this.stub(BusinessRepository, 'getBusinessUser');
    await BusinessService.getBusinessUser(req.user._id);
    assert.calledWith(BusinessRepository.getBusinessUser, req.user._id);
  }));

  it('should call editBusinessUser business repository with correct parameters.', test(async function () {
    this.stub(BusinessRepository, 'editBusinessUser');
    await BusinessService.editBusinessUser(req.user._id, req.body);
    assert.calledWith(BusinessRepository.editBusinessUser, req.user._id, req.body);
  }));
});