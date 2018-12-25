var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var Controller = require('../../controllers/AccountController')
var AccountFactory = require('../factories/AccountFactory');
var AccountService = require('../../service/AccountService');

describe('account controller migrant', function () {
  let req = {
    body: AccountFactory.validMigrantAccount()
  };

  it('should create a migrant', test(async function () {
    this.stub(AccountService, 'createUser');
    await Controller.createUser(req.body);
    assert.calledWith(AccountService.createUser, req.body);
  }));
});

describe('account controller business', function () {
  let req = {
    body: AccountFactory.validBusinessAccount()
  };

  it('should create a business user', test(async function () {
    this.stub(AccountService, 'createBusiness');
    await Controller.createBusiness(req.body);
    assert.calledWith(AccountService.createBusiness, req.body);
  }));
});

describe('account controller admin', function () {
  let req = {
    body: AccountFactory.validAdminAccount()
  };

  it('should create an admin', test(async function () {
      this.stub(AccountService, 'createAdmin');
      await Controller.createAdmin(req.body);
      assert.calledWith(AccountService.createAdmin, req.body);
  }));
});
