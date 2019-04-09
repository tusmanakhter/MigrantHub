var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var AccountFactory = require('../factories/AccountFactory');
var AccountService = require('../../service/AccountService');
var SavedJobService = require('../../service/SavedJobService');
var SavedEventService = require('../../service/SavedEventService');
var MigrantRepository = require('../../repository/MigrantRepository');
var MigrantAccountValidator = require('../../validators/MigrantAccountValidator');
var PinnedServiceService = require('../../service/PinnedServiceService');
var BusinessRepository = require('../../repository/BusinessRepository');
var UserRepository = require('../../repository/UserRepository');
var BusinessAccountValidator = require('../../validators/BusinessAccountValidator');
var AdminRepository = require('../../repository/AdminRepository');
var AdminAccountValidator = require('../../validators/AdminAccountValidator');
var { ServerError } = require('../../errors/ServerError');
var SendEmail = require('../../mail/SendEmail');
var bcrypt = require('bcryptjs');
var crypto = require('crypto');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('account service migrant', function () {
  let req = {
    body: AccountFactory.validMigrantAccount()
  };

  it('should call MigrantRepository repository with no errors to createUser', test(async function () {
    this.stub(MigrantRepository, 'createUser');
    this.stub(SavedJobService, 'createSavedJob');
    this.stub(PinnedServiceService, 'createPinnedService');
    this.stub(SavedEventService, 'createSavedEvent');
    this.stub(MigrantAccountValidator, 'migrantAccountValidator').returns('');
    this.stub(bcrypt, 'hashSync').returns('$2a$10$XlWI50RjCbUmZ7tJFuVoRe9O1UFhtIDJ1PAw62cR5YDwnaQAJcTEK');
    this.stub(SendEmail, 'sendEmail');
    await AccountService.createUser(req.body);
    let tempMigrantUserObject = req.body;
    tempMigrantUserObject.password = '$2a$10$XlWI50RjCbUmZ7tJFuVoRe9O1UFhtIDJ1PAw62cR5YDwnaQAJcTEK';
    assert.calledWith(MigrantRepository.createUser, tempMigrantUserObject);
    assert.calledWith(SendEmail.sendEmail, req.body.email);
  }));

  it('should call MigrantRepository repository with error in validation to createUser', test(function () {
    this.stub(MigrantRepository, 'createUser');
    this.stub(SavedJobService, 'createSavedJob');
    this.stub(PinnedServiceService, 'createPinnedService');
    this.stub(SavedEventService, 'createSavedEvent');
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
      this.stub(SendEmail, 'sendEmail');
      await AccountService.createBusiness(req.body);
      let tempBusinessUserObject = req.body;
      tempBusinessUserObject.password = '$2a$10$XlWI50RjCbUmZ7tJFuVoRe9O1UFhtIDJ1PAw62cR5YDwnaQAJcTEK';
      assert.calledWith(BusinessRepository.createBusiness, tempBusinessUserObject);
      assert.calledWith(SendEmail.sendEmail, req.body.email);
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
      this.stub(SendEmail, 'sendEmail');
      await AccountService.createAdmin(req.body);
      let tempAdminObject = req.body;
      tempAdminObject.password = '$2a$10$XlWI50RjCbUmZ7tJFuVoRe9O1UFhtIDJ1PAw62cR5YDwnaQAJcTEK';
      assert.calledWith(AdminRepository.createAdmin, req.body);
      assert.calledWith(SendEmail.sendEmail, req.body.email);
  }));

  it('should call AdminRepository repository with error in validation to createAdmin', test(function () {
      this.stub(AdminRepository, 'createAdmin');
      this.stub(AdminAccountValidator, 'adminAccountValidator').returns("error");
      return chai.assert.isRejected(AccountService.createAdmin(req.body), ServerError, 'There was an error creating admin user.');
  }));
});

describe('account service user', function () {
    let req = {
        user: {
            _id: 'test@test.test',
            userType: 'local',
            password: 'test123',
            resetPasswordToken: 'abcdefghifhly'
        },
        user2: {
            _id: 'test@test.test',
            password: 'test123',
            resetPasswordToken: 'sjdfhskdfhskdf'
        },
        token: 'abcdefghifhly'
    };

    it('should call getUser user repository with correct parameters.', test(async function () {
        this.stub(UserRepository, 'getUser');
        await AccountService.getUser(req.user._id);
        assert.calledWith(UserRepository.getUser, req.user._id);
    }));

    it('should call UserRepository repository with no errors to forgotPassword', test(async function () {
        this.stub(UserRepository, 'getUser').returns(req.user);
        this.stub(UserRepository, 'update');
        this.stub(crypto, 'randomBytes').returns('2a10XlWI50RjCbUmZ7tJ');
        this.stub(Date, 'now').returns('2019-01-25T00:32:22.749Z');
        this.stub(SendEmail, 'sendEmail');
        await AccountService.forgotPassword(req.user._id);
        assert.calledWith(UserRepository.update, req.user._id);
    }));

    it('should call UserRepository repository with error in validation to forgotPassword', test(function () {
        this.stub(UserRepository, 'getUser').returns(false);
        return chai.assert.isRejected(AccountService.forgotPassword(req.user._id), ServerError, 'User does not exist.');
    }));

    it('should call UserRepository repository with no errors to resetPassword', test(async function () {
        this.stub(UserRepository, 'getUser').returns(req.user);
        this.stub(UserRepository, 'update');
        this.stub(bcrypt, 'hashSync').returns('$2a$10$XlWI50RjCbUmZ7tJFuVoRe9O1UFhtIDJ1PAw62cR5YDwnaQAJcTEK');
        await AccountService.resetPassword(req.user._id, req.user.password, req.token);
        let updatePassword = {
            localAuthentication : {
                password: '$2a$10$XlWI50RjCbUmZ7tJFuVoRe9O1UFhtIDJ1PAw62cR5YDwnaQAJcTEK',
            }
        };
        assert.calledWith(UserRepository.update, req.user._id, updatePassword);
    }));

    it('should call UserRepository repository with error in validation to resetPassword', test(function () {
        this.stub(UserRepository, 'getUser').returns(req.user2);
        return chai.assert.isRejected(AccountService.resetPassword(req.user._id, req.user.password, req.token), ServerError, 'Invalid reset password request.');
    }));

  it('should call UserRepository getUser and return user when user found for checkUserExists', test(async function () {
    this.stub(UserRepository, 'getUser').returns(req.user);
    await AccountService.checkUserExists(req.user._id);
    assert.calledWith(UserRepository.getUser, req.user._id);
  }));

  it('should call UserRepository getUser and throw an error when no user found for checkUserExists', test(function () {
    this.stub(UserRepository, 'getUser').returns(null);
    return chai.assert.isRejected(AccountService.checkUserExists(req.user._id), ServerError, 'User does not exist.');
  }));
});
