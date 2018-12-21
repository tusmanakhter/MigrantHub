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
    Controller.createUser(req.body);
    assert.calledWith(await AccountService.createUser, req.body);
  }));
});

describe('account controller business', function () {
  let req = {
    body: AccountFactory.validBusinessAccount()
  };

  it('should create a business user', test(async function () {
    this.stub(AccountService, 'createBusiness');
    Controller.createBusiness(req.body);
    assert.calledWith(await AccountService.createBusiness, req.body);
  }));
});

describe('account controller admin', function () {
  let req = {
    body: AccountFactory.validAdminAccount()
  };

  it('should create an admin', test(async function () {
      this.stub(AccountService, 'createAdmin');
      Controller.createAdmin(req.body);
      assert.calledWith(await AccountService.createAdmin, req.body);
  }));
});
