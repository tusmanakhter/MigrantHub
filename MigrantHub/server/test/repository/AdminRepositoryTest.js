var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var Admin = require('../../models/Admin')
var AccountFactory = require('../factories/AccountFactory');
var AdminRepository = require('../../repository/AdminRepository');
var { ServerError } = require('../../errors/ServerError');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('admin repository', function () {
  let req = {
      body: AccountFactory.validAdminAccount(),
      admin:{
          _id: "admin@test.com"
      },
  };

  it('should create a migrant and return promise', test(function () {
      this.stub(Admin.prototype, 'save').returns(Promise.resolve({}));
      return chai.assert.isFulfilled(AdminRepository.createAdmin(req.body), 'Admin User has been created.');
  }));

  it('should throw error, since there was a error saving migrant user', test(function () {
      this.stub(Admin.prototype, 'save').returns(Promise.reject({}));
      return chai.assert.isRejected(AdminRepository.createAdmin(req.body), ServerError, 'There was an error creating admin.');
  }));

  it('should successfully call mongodb find', test(function () {
      this.stub(Admin, 'find').returns({exec: sinon.stub().returns(Promise.resolve({}))});
      this.stub(Date, 'now').returns('2018-12-19T00:32:22.749Z');
      AdminRepository.getAdmins({ deleted: true });
      assert.calledWith(Admin.find, { deleted: true });
  }));

  it('should throw error, since there was a error finding admins', test(function () {
      this.stub(Admin, 'find').returns({exec: sinon.stub().returns(Promise.reject({}))});
      return chai.assert.isRejected(AdminRepository.getAdmins({ deleted: true }), ServerError, 'There was an error retrieving admins.');
  }));

  it('should successfully call mongodb updateOne with passed query and admin id', test(function () {
      this.stub(Admin, 'updateOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
      this.stub(Date, 'now').returns('2018-12-19T00:32:22.749Z');
      AdminRepository.updateAdminStatus(req.admin._id, { rejected: true, rejectedDate: Date.now() });
      assert.calledWith(Admin.updateOne, { _id: req.admin._id }, { rejected: true, rejectedDate: Date.now() });
  }));

  it('should throw error, since there was a error updating admin status', test(function () {
      this.stub(Admin, 'updateOne').returns({exec: sinon.stub().returns(Promise.reject({}))});
      return chai.assert.isRejected(AdminRepository.updateAdminStatus(req.admin._id, { rejected: true, rejectedDate: Date.now() }), ServerError, 'There was an error updating admin.');
  }));
});
