var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var MigrantUser = require('../../models/MigrantUser')
var AccountFactory = require('../factories/AccountFactory');
var MigrantUserRepository = require('../../repository/MigrantUserRepository');
var chai = require('chai');

describe('migrant user repository', function () {
  let req = {
    body: AccountFactory.validMigrantAccount()
  };

  it('should create a migrant and return promise', test(async function () {
    this.stub(MigrantUser.prototype, 'save').returns(Promise.resolve({}));
    MigrantUserRepository.createUser(req.body);
    assert.calledWith(MigrantUser.prototype.save);
    try {
        chai.expect(await MigrantUserRepository.createUser(req.body)).should.be.fulfilled;
    }catch(error){
        chai.expect(error, false);
    }
  }));

    it('should throw error, since there was a error saving migrant user', test(async function () {
        this.stub(MigrantUser.prototype, 'save').returns(Promise.reject({}));
        MigrantUserRepository.createUser(req.body);
        assert.calledWith(MigrantUser.prototype.save);
        try {
            chai.expect(await MigrantUserRepository.createUser(req.body)).to.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));
});
