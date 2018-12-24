var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var Admin = require('../../models/Admin')
var AccountFactory = require('../factories/AccountFactory');
var AdminRepository = require('../../repository/AdminRepository');
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

  it('should create a migrant and return promise', test(async function () {
    this.stub(Admin.prototype, 'save').returns(Promise.resolve({}));
    AdminRepository.createAdmin(req.body);
    try {
        chai.expect(await AdminRepository.createAdmin(req.body)).should.be.fulfilled;
        assert.calledWith(Admin.prototype.save);
    }catch(error){
        chai.expect(error, false);
    }
  }));

    it('should throw error, since there was a error saving migrant user', test(async function () {
        this.stub(Admin.prototype, 'save').returns(Promise.reject({}));
        AdminRepository.createAdmin(req.body);
        try {
            chai.expect(await AdminRepository.createAdmin(req.body)).should.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));

    it('should successfully call mongodb find', test(async function () {
        this.stub(Admin, 'find').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        this.stub(Date, 'now').returns('2018-12-19T00:32:22.749Z');
        AdminRepository.getAdmins({ deleted: true });
        assert.calledWith(Admin.find, { deleted: true });
    }));

    it('should throw error, since there was a error finding admins', test(async function () {
        this.stub(Admin, 'find').returns(Promise.reject({}));
        try {
            chai.expect(await AdminRepository.getAdmins({ deleted: true })).should.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));

    it('should successfully call mongodb updateOne with passed query and admin id', test(async function () {
        this.stub(Admin, 'updateOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        this.stub(Date, 'now').returns('2018-12-19T00:32:22.749Z');
        AdminRepository.updateAdminStatus(req.admin._id, { rejected: true, rejectedDate: Date.now() });
        assert.calledWith(Admin.updateOne, { _id: req.admin._id }, { rejected: true, rejectedDate: Date.now() });
    }));

    it('should throw error, since there was a error updating admin status', test(async function () {
        this.stub(Admin, 'updateOne').returns(Promise.reject({}));
        try {
            chai.expect(await AdminRepository.updateAdminStatus(req.admin._id, { rejected: true, rejectedDate: Date.now() })).should.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));
});
