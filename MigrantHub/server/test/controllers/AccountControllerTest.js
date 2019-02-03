var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var AccountController = require('../../controllers/AccountController')
var AccountFactory = require('../factories/AccountFactory');
var AccountService = require('../../service/AccountService');

describe('account controller migrant', function () {
  let req = {
    body: AccountFactory.validMigrantAccount()
  };

  it('should create a migrant', test(async function () {
    this.stub(AccountService, 'createUser');
    await AccountController.createUser(req.body);
    assert.calledWith(AccountService.createUser, req.body);
  }));
});

describe('account controller business', function () {
  let req = {
    body: AccountFactory.validBusinessAccount()
  };

  it('should create a business user', test(async function () {
    this.stub(AccountService, 'createBusiness');
    await AccountController.createBusiness(req.body);
    assert.calledWith(AccountService.createBusiness, req.body);
  }));
});

describe('account controller admin', function () {
  let req = {
    body: AccountFactory.validAdminAccount()
  };

  it('should create an admin', test(async function () {
      this.stub(AccountService, 'createAdmin');
      await AccountController.createAdmin(req.body);
      assert.calledWith(AccountService.createAdmin, req.body);
  }));
});

describe('account controller user', function () {
    let req = {
        user: {
          _id: 'test@test.test',
          password: 'test123'
        },
        token: 'abcdefghifhly'
    };

    it('should call getUser user service with correct parameters.', test(async function () {
        this.stub(AccountService, 'getUser');
        await AccountController.getUser(req.user._id);
        assert.calledWith(AccountService.getUser, req.user._id);
    }));

    it('should call forgotPassword account service with correct parameters.', test(async function () {
        this.stub(AccountService, 'forgotPassword');
        await AccountController.forgotPassword(req.user._id);
        assert.calledWith(AccountService.forgotPassword, req.user._id);
    }));

    it('should call resetPassword account service with correct parameters.', test(async function () {
        this.stub(AccountService, 'resetPassword');
        await AccountController.resetPassword(req.user._id, req.user.password, req.token);
        assert.calledWith(AccountService.resetPassword, req.user._id, req.user.password, req.token);
    }));
});

