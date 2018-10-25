var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var Controller = require('../../controllers/adminController')
var Admin = require('../../models/Admin')

describe('admin controller', function () {
  let req = {
    body: {}
  },
  error = new Error({ error: "err" }),
  res = {}, expectedResult;

  beforeEach(function () {
    res = {
        send: sinon.spy(),
        status: sinon.stub().returns({ end: sinon.spy() })
    };
    expectedResult = [{}, {}, {}]
  });

  it('should return array of unathorized admins or empty', test(function () {
    this.stub(Admin, 'find').yields(null, expectedResult);
    Controller.getUnapprovedAdmins(req, res);
    sinon.assert.calledWith(Admin.find, { authorized: false });
    sinon.assert.calledWith(res.send, sinon.match.array);
  }));

  it('should return error message on server error', test(function () {
    this.stub(Admin, 'find').yields(error);
    Controller.getUnapprovedAdmins(req, res);
    sinon.assert.calledWith(Admin.find, { authorized: false });
    sinon.assert.calledWith(res.send , "There was an error finding unnaproved admins");
  }));
});