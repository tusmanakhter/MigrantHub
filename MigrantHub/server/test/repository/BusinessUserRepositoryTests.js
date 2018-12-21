var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var BusinessUser = require('../../models/BusinessUser')
var AccountFactory = require('../factories/AccountFactory');
var BusinessUserRepository = require('../../repository/BusinessUserRepository');
var chai = require('chai');

describe('business user repository', function () {
  let req = {
    body: AccountFactory.validBusinessAccount()
  };

  it('should create a business and return promise', test(async function () {
    this.stub(BusinessUser.prototype, 'save').returns(Promise.resolve({}));
    BusinessUserRepository.createBusiness(req.body);
    assert.calledWith(BusinessUser.prototype.save);
    try {
        chai.expect(await BusinessUserRepository.createUser(req.body)).should.be.fulfilled;
    }catch(error){
        chai.expect(error, false);
    }
  }));

    it('should throw error, since there was a error saving business user', test(async function () {
        this.stub(BusinessUser.prototype, 'save').returns(Promise.reject({}));
        BusinessUserRepository.createBusiness(req.body);
        assert.calledWith(BusinessUser.prototype.save);
        try {
            chai.expect(await BusinessUserRepository.createUser(req.body)).to.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));
});
