var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var BusinessController = require('../../controllers/BusinessController');
var AccountFactory = require('../factories/AccountFactory');
var BusinessService = require('../../service/BusinessService');

describe('business controller', function () {
  let req = {
    body: AccountFactory.validBusinessAccount(),
    user:{
      _id: "test@test.com"
    },
  };

  it('should call getBusinessUser business service with correct parameters.', test(async function () {
      this.stub(BusinessService, 'getBusinessUser');
      await BusinessController.getBusinessUser(req.user._id);
      assert.calledWith(BusinessService.getBusinessUser, req.user._id);
  }));

  it('should call editBusinessUser business service with correct parameters.', test(async function () {
      this.stub(BusinessService, 'editBusinessUser');
      await BusinessController.editBusinessUser(req.user._id, req.body);
      assert.calledWith(BusinessService.editBusinessUser, req.user._id, req.body);
  }));
});