var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var Controller = require('../../controllers/migrantController');
var MigrantUser = require('../../models/MigrantUser');
var AccountFactory = require('../factories/AccountFactory');


describe('migrant controller', function () {
  let req = {
    body: AccountFactory.validMigrantAccount(),
  session: {
    passport:{
      user:{
        _id: "test@test.com"
      }
    }
  }
  },
  res = {}, expectedResult;
  
  beforeEach(function () {
    status = sinon.stub();
    send = sinon.spy();
    res = { send, status };
    status.returns(res);
  });

  it('should get migrant profile', test(function () {
    this.stub(MigrantUser, 'findOne')
    Controller.getMigrantUser(req, res);
    sinon.assert.calledWith(MigrantUser.findOne, {email: "test@test.com"});
  })); 
  
  it('should edit migrant profile', test(function () {
    expectedResult = req.body
    this.stub(MigrantUser, 'findByIdAndUpdate').yields(null, expectedResult);
    Controller.editMigrantUser(req, res);
    sinon.assert.calledWith(res.send, "Updated Migrant User");
  })); 
});