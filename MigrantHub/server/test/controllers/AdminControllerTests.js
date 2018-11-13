var { spy, stub, assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var Controller = require('../../controllers/adminController')
var Admin = require('../../models/Admin')
var AccountFactory = require('../factories/AccountFactory');

describe('admin controller', function () {
  let req = {
    body: AccountFactory.validAdminAccount(),
    params: {
      id: "test@test.com",
    },
    user:{
      _id: "test@test.com"
    },
  },
  error = new Error({ error: "err" }),
  res = {}, expectedResult;

  beforeEach(function () {
    status = stub();
    send = spy();
    res = { send, status };
    status.returns(res);
    expectedResult = [{}, {}, {}]
  });

  it('should return array of current admins or empty', test(function () {
    this.stub(Admin, 'find').yields(null, expectedResult);
    Controller.getAdmins(req, res);
    assert.calledWith(Admin.find, { _id: { $ne: "test@test.com" }, authorized: true, rejected: false, deleted: false });
    assert.calledWith(res.send, sinon.match.array);
    assert.calledWith(res.status, 200);
  }));

  it('should return error message on current admins error', test(function () {
    this.stub(Admin, 'find').yields(error);
    Controller.getAdmins(req, res);
    assert.calledWith(Admin.find, { _id: { $ne: "test@test.com" }, authorized: true, rejected: false, deleted: false });
    assert.calledWith(res.send, "There was an error finding admins");
    assert.calledWith(res.status, 500);
  }));

  it('should return array of deleted admins or empty', test(function () {
    this.stub(Admin, 'find').yields(null, expectedResult);
    Controller.getDeletedAdmins(req, res);
    assert.calledWith(Admin.find, { deleted: true });
    assert.calledWith(res.send, sinon.match.array);
    assert.calledWith(res.status, 200);
  }));

  it('should return error message on deleted admins error', test(function () {
    this.stub(Admin, 'find').yields(error);
    Controller.getDeletedAdmins(req, res);
    assert.calledWith(Admin.find, { deleted: true });
    assert.calledWith(res.send, "There was an error finding deleted admins");
    assert.calledWith(res.status, 500);
  }));

  it('should return array of rejected admins or empty', test(function () {
    this.stub(Admin, 'find').yields(null, expectedResult);
    Controller.getRejectedAdmins(req, res);
    assert.calledWith(Admin.find, { authorized: false, rejected: true });
    assert.calledWith(res.send, sinon.match.array);
    assert.calledWith(res.status, 200);
  }));

  it('should return error message on rejected admins error', test(function () {
    this.stub(Admin, 'find').yields(error);
    Controller.getRejectedAdmins(req, res);
    assert.calledWith(Admin.find, { authorized: false, rejected: true });
    assert.calledWith(res.send, "There was an error finding rejected admins");
    assert.calledWith(res.status, 500);
  }));
  
  it('should return array of unathorized admins or empty', test(function () {
    this.stub(Admin, 'find').yields(null, expectedResult);
    Controller.getUnapprovedAdmins(req, res);
    assert.calledWith(Admin.find, { authorized: false, rejected: false, deleted: false });
    assert.calledWith(res.send, sinon.match.array);
    assert.calledWith(res.status, 200);
  }));

  it('should return error message on server error', test(function () {
    this.stub(Admin, 'find').yields(error);
    Controller.getUnapprovedAdmins(req, res);
    assert.calledWith(Admin.find, { authorized: false, rejected: false, deleted: false });
    assert.calledWith(res.send, "There was an error finding unnaproved admins");
    assert.calledWith(res.status, 500);
  }));

  it('should reactivate an admin', test(function () {
    this.stub(Admin, 'updateOne').yields(null);
    Controller.reactivateAdmin(req, res);
    assert.calledWith(Admin.updateOne, { _id: "test@test.com" }, { authorized: true, deleted: false, deletedDate: null });
    assert.calledWith(res.send, "Admin reactivated successfully.");
    assert.calledWith(res.status, 200);
  }));

  it('should not reactivate admin on error', test(function () {
    this.stub(Admin, 'updateOne').yields(error);
    Controller.reactivateAdmin(req, res);
    assert.calledWith(Admin.updateOne, { _id: "test@test.com" }, { authorized: true, deleted: false, deletedDate: null });
    assert.calledWith(res.send, "There was an error reactivating admin.");
    assert.calledWith(res.status, 500);
  }));

  it('should approve an admin', test(function () {
    this.stub(Admin, 'updateOne').yields(null);
    Controller.approveAdmin(req, res);
    assert.calledWith(Admin.updateOne, { _id: "test@test.com" }, { authorized: true, rejected: false, rejectedDate: null });
    assert.calledWith(res.send, "Admin approved successfully.");
    assert.calledWith(res.status, 200);
  }));

  it('should not approve admin on error', test(function () {
    this.stub(Admin, 'updateOne').yields(error);
    Controller.approveAdmin(req, res);
    assert.calledWith(Admin.updateOne, { _id: "test@test.com" }, { authorized: true, rejected: false, rejectedDate: null });
    assert.calledWith(res.send, "There was an error approving admin.");
    assert.calledWith(res.status, 500);
  }));

  it('should reject an admin', test(function () {
    this.stub(Admin, 'updateOne').yields(null);
    Controller.rejectAdmin(req, res);
    assert.calledWith(Admin.updateOne, { _id: "test@test.com" }, { rejected: true, rejectedDate: Date.now() });
    assert.calledWith(res.send, "Admin rejected successfully.");
    assert.calledWith(res.status, 200);
  }));

  it('should not reject admin on error', test(function () {
    this.stub(Admin, 'updateOne').yields(error);
    Controller.rejectAdmin(req, res);
    assert.calledWith(Admin.updateOne, { _id: "test@test.com" }, { rejected: true, rejectedDate: Date.now() });
    assert.calledWith(res.send, "There was an error rejecting admin.");
    assert.calledWith(res.status, 500);
  }));

  it('should delete an admin', test(function () {
    this.stub(Admin, 'updateOne').yields(null);
    Controller.deleteAdmin(req, res);
    assert.calledWith(Admin.updateOne, { _id: "test@test.com" }, { authorized: false, deleted: true, deletedDate: Date.now() });
    assert.calledWith(res.send, "Admin deleted successfully.");
    assert.calledWith(res.status, 200);
  }));

  it('should not delete admin on error', test(function () {
    this.stub(Admin, 'updateOne').yields(error);
    Controller.deleteAdmin(req, res);
    assert.calledWith(Admin.updateOne, { _id: "test@test.com" }, { authorized: false, deleted: true, deletedDate: Date.now() });
    assert.calledWith(res.send, "There was an error deleting admin.");
    assert.calledWith(res.status, 500);
  }));
});