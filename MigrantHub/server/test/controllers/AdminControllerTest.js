var { stub, assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var AdminController = require('../../controllers/AdminController')
var AdminService = require('../../service/AdminService');

describe('admin controller', function () {
    let req = {
        user:{
            _id: "test@test.com"
        },
        admin:{
            _id: "test@test.com"
        },
    };

    it('should call admin service getAdmins with correct parameters', test(async function () {
        this.stub(AdminService, 'getAdmins');
        await AdminController.getAdmins(req.user);
        assert.calledWith(AdminService.getAdmins, req.user);
    }));

    it('should call admin service getAdmins with no parameters', test(async function () {
        this.stub(AdminService, 'getAdmins');
        await AdminController.getAllAdmins();
        assert.called(AdminService.getAdmins);
    }));

    it('should call admin service getDeletedAdmins with correct parameters', test(async function () {
        this.stub(AdminService, 'getDeletedAdmins');
        await AdminController.getDeletedAdmins();
        assert.called(AdminService.getDeletedAdmins);
    }));

    it('should call admin service getRejectedAdmins with correct parameters', test(async function () {
        this.stub(AdminService, 'getRejectedAdmins');
        await AdminController.getRejectedAdmins();
        assert.called(AdminService.getRejectedAdmins);
    }));

    it('should call admin service getUnapprovedAdmins with correct parameters', test(async function () {
        this.stub(AdminService, 'getUnapprovedAdmins');
        await AdminController.getUnapprovedAdmins();
        assert.called(AdminService.getUnapprovedAdmins);
    }));

    it('should call admin service reactivateAdmin with correct parameters', test(async function () {
        this.stub(AdminService, 'reactivateAdmin');
        await AdminController.reactivateAdmin(req.admin._id);
        assert.calledWith(AdminService.reactivateAdmin, req.admin._id);
    }));

    it('should call admin service approveAdmin with correct parameters', test(async function () {
        this.stub(AdminService, 'approveAdmin');
        await AdminController.approveAdmin(req.admin._id);
        assert.calledWith(AdminService.approveAdmin, req.admin._id);
    }));

    it('should call admin service rejectAdmin with correct parameters', test(async function () {
        this.stub(AdminService, 'rejectAdmin');
        await AdminController.rejectAdmin(req.admin._id);
        assert.calledWith(AdminService.rejectAdmin, req.admin._id);
    }));

    it('should call admin service deleteAdmin with correct parameters', test(async function () {
        this.stub(AdminService, 'deleteAdmin');
        await AdminController.deleteAdmin(req.admin._id, req.user._id);
        assert.calledWith(AdminService.deleteAdmin, req.admin._id, req.user._id);
    }));
});