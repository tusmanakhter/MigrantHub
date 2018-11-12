var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var Controller = require('../../controllers/businessController');
var BusinessUser = require('../../models/BusinessUser');
var AccountFactory = require('../factories/AccountFactory');


describe('business controller', function () {
  let req = {
    body: AccountFactory.validBusinessAccount(),
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
  
  it('should get business profile', test(function () {
    this.stub(BusinessUser, 'findOne')
    Controller.getBusinessUser(req, res);
    sinon.assert.calledWith(BusinessUser.findOne, {email: "test@test.com"});
  })); 

  it('should edit business profile', test(function () {
    expectedResult = req.body
    this.stub(BusinessUser, 'findByIdAndUpdate').yields(null, expectedResult);    
    Controller.editBusinessUser(req, res);
    sinon.assert.calledWith(res.send, "Updated Business User");
  })); 
});