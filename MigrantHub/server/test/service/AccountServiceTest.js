var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var AccountFactory = require('../factories/AccountFactory');
var AccountService = require('../../service/AccountService');
var MigrantRepository = require('../../repository/MigrantRepository');
var MigrantAccountValidator = require('../../validators/MigrantAccountValidator');
var BusinessRepository = require('../../repository/BusinessRepository');
var BusinessAccountValidator = require('../../validators/BusinessAccountValidator');
var AdminRepository = require('../../repository/AdminRepository');
var AdminAccountValidator = require('../../validators/AdminAccountValidator');
var { ServerError } = require('../../errors/ServerError');
var bcrypt = require('bcryptjs');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('account service migrant', function () {
  let req = {
    body: AccountFactory.validMigrantAccount()
  };

  it('should call MigrantRepository repository with no errors to createUser', test(async function () {
    this.stub(MigrantRepository, 'createUser');
    this.stub(MigrantAccountValidator, 'migrantAccountValidator').returns('');
    this.stub(bcrypt, 'hashSync').returns('$2a$10$XlWI50RjCbUmZ7tJFuVoRe9O1UFhtIDJ1PAw62cR5YDwnaQAJcTEK');
    AccountService.createUser(req.body);
    let tempMigrantUserObject = req.body;
    tempMigrantUserObject.password = '$2a$10$XlWI50RjCbUmZ7tJFuVoRe9O1UFhtIDJ1PAw62cR5YDwnaQAJcTEK';
    assert.calledWith(await MigrantRepository.createUser, tempMigrantUserObject);
  }));

  it('should call MigrantRepository repository with error in validation to createUser', test(function () {
    this.stub(MigrantRepository, 'createUser');
    this.stub(MigrantAccountValidator, 'migrantAccountValidator').returns("error");
      return chai.assert.isRejected(AccountService.createUser(req.body), ServerError, 'There was an error creating migrant user.');
  }));
});

describe('account service business', function () {
  let req = {
    body: AccountFactory.validBusinessAccount()
  };

  it('should call BusinessRepository repository with no errors to createBusiness', test(async function () {
      this.stub(BusinessRepository, 'createBusiness');
      this.stub(BusinessAccountValidator, 'businessAccountValidator').returns('');
      this.stub(bcrypt, 'hashSync').returns('$2a$10$XlWI50RjCbUmZ7tJFuVoRe9O1UFhtIDJ1PAw62cR5YDwnaQAJcTEK');
      AccountService.createBusiness(req.body);
      let tempBusinessUserObject = req.body;
      tempBusinessUserObject.password = '$2a$10$XlWI50RjCbUmZ7tJFuVoRe9O1UFhtIDJ1PAw62cR5YDwnaQAJcTEK';
      assert.calledWith(await BusinessRepository.createBusiness, tempBusinessUserObject);
  }));

  it('should call BusinessRepository repository with error in validation to createBusiness', test(async function () {
      this.stub(BusinessRepository, 'createBusiness');
      this.stub(BusinessAccountValidator, 'businessAccountValidator').returns("error");
      return chai.assert.isRejected(AccountService.createBusiness(req.body), ServerError, 'There was an error creating business user.');
  }));

});

describe('account service admin', function () {
  let req = {
    body: AccountFactory.validAdminAccount()
  };

  it('should call AdminRepository repository with no errors to createAdmin', test(async function () {
      this.stub(AdminRepository, 'createAdmin');
      this.stub(AdminAccountValidator, 'adminAccountValidator').returns('');
      this.stub(bcrypt, 'hashSync').returns('$2a$10$XlWI50RjCbUmZ7tJFuVoRe9O1UFhtIDJ1PAw62cR5YDwnaQAJcTEK');
      AccountService.createAdmin(req.body);
      let tempAdminObject = req.body;
      tempAdminObject.password = '$2a$10$XlWI50RjCbUmZ7tJFuVoRe9O1UFhtIDJ1PAw62cR5YDwnaQAJcTEK';
      assert.calledWith(await AdminRepository.createAdmin, req.body);
  }));

  it('should call AdminRepository repository with error in validation to createAdmin', test(function () {
      this.stub(AdminRepository, 'createAdmin');
      this.stub(AdminAccountValidator, 'adminAccountValidator').returns("error");
      return chai.assert.isRejected(AccountService.createAdmin(req.body), ServerError, 'There was an error creating admin user.');
  }));
});
