var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var Admin = require('../../models/Admin')
var AccountFactory = require('../factories/AccountFactory');
var AdminRepository = require('../../repository/AdminRepository');
var chai = require('chai');

describe('admin repository', function () {
  let req = {
    body: AccountFactory.validAdminAccount()
  };

  it('should create a migrant and return promise', test(async function () {
    this.stub(Admin.prototype, 'save').returns(Promise.resolve({}));
      AdminRepository.createAdmin(req.body);
    assert.calledWith(Admin.prototype.save);
    try {
        chai.expect(await AdminRepository.createUser(req.body)).should.be.fulfilled;
    }catch(error){
        chai.expect(error, false);
    }
  }));

    it('should throw error, since there was a error saving migrant user', test(async function () {
        this.stub(Admin.prototype, 'save').returns(Promise.reject({}));
        AdminRepository.createAdmin(req.body);
        assert.calledWith(Admin.prototype.save);
        try {
            chai.expect(await AdminRepository.createUser(req.body)).to.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));
});
