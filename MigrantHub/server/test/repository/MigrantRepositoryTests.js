var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var MigrantUser = require('../../models/MigrantUser')
var AccountFactory = require('../factories/AccountFactory');
var MigrantRepository = require('../../repository/MigrantRepository');
var chai = require('chai');

describe('migrant repository', function () {
  let req = {
    body: AccountFactory.validMigrantAccount(),
    user:{
        _id: "test@test.com"
    },
  };

  it('should create a migrant and return promise', test(async function () {
    this.stub(MigrantUser.prototype, 'save').returns(Promise.resolve({}));
    try {
        chai.expect(await MigrantRepository.createUser(req.body)).should.be.fulfilled;
        assert.calledWith(MigrantUser.prototype.save);
    }catch(error){
        chai.expect(error, false);
    }
  }));

  it('should throw error, since there was a error saving migrant user', test(async function () {
      this.stub(MigrantUser.prototype, 'save').returns(Promise.reject({}));
      try {
          chai.expect(await MigrantRepository.createUser(req.body)).to.be.rejected;
      }catch(error){
          chai.expect(error, true);
      }
  }));

  it('should successfully call mongodb findOne migrant user', test(async function () {
      this.stub(MigrantUser, 'findByIdAndUpdate').returns({exec: sinon.stub().returns(Promise.resolve({}))});
      MigrantRepository.editMigrantUser(req.user._id, req.body);
      assert.calledWith(MigrantUser.findByIdAndUpdate, { _id: req.user._id });
  }));

  it('should throw error, since there was a error migrant business user', test(async function () {
      this.stub(MigrantUser, 'findByIdAndUpdate').returns(Promise.reject({}));
      try {
          chai.expect(await MigrantRepository.editMigrantUser(req.user._id, req.body)).to.be.rejected;
      }catch(error){
            chai.expect(error, true);
      }
  }));
});
