var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var MigrantUser = require('../../models/MigrantUser');
var AccountFactory = require('../factories/AccountFactory');
var MigrantRepository = require('../../repository/MigrantRepository');
var { ServerError } = require('../../errors/ServerError');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('migrant repository', function () {
  let req = {
    body: AccountFactory.validMigrantAccount(),
    user:{
        _id: "test@test.com"
    },
  };

  it('should create a migrant and return promise', test(function () {
    this.stub(MigrantUser.prototype, 'save').returns(Promise.resolve({}));
    return chai.assert.isFulfilled(MigrantRepository.createUser(req.body), 'Migrant User has been created.');
  }));

  it('should throw error, since there was a error saving migrant user', test(function () {
      this.stub(MigrantUser.prototype, 'save').returns(Promise.reject({}));
      return chai.assert.isRejected(MigrantRepository.createUser(req.body), ServerError, 'There was an error saving migrant user.');
  }));

  it('should successfully call mongodb findOne migrant user', test(function () {
      this.stub(MigrantUser, 'findByIdAndUpdate').returns({exec: sinon.stub().returns(Promise.resolve({}))});
      MigrantRepository.editMigrantUser(req.user._id, req.body);
      assert.calledWith(MigrantUser.findByIdAndUpdate, { _id: req.user._id });
  }));

  it('should throw error, since there was a error migrant business user', test(function () {
      this.stub(MigrantUser, 'findByIdAndUpdate').returns({exec: sinon.stub().returns(Promise.reject({}))});
      return chai.assert.isRejected(MigrantRepository.editMigrantUser(req.user._id, req.body), ServerError, 'There was an error retrieving updating migrant user.');
  }));
});
