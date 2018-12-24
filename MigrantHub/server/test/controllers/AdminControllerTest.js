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
        AdminController.getAdmins(req.user);
        assert.calledWith(await AdminService.getAdmins, req.user);
    }));

    it('should call admin service getDeletedAdmins with correct parameters', test(async function () {
        this.stub(AdminService, 'getDeletedAdmins');
        AdminController.getDeletedAdmins();
        assert.called(await AdminService.getDeletedAdmins);
    }));

    it('should call admin service getRejectedAdmins with correct parameters', test(async function () {
        this.stub(AdminService, 'getRejectedAdmins');
        AdminController.getRejectedAdmins();
        assert.called(await AdminService.getRejectedAdmins);
    }));

    it('should call admin service getUnapprovedAdmins with correct parameters', test(async function () {
        this.stub(AdminService, 'getUnapprovedAdmins');
        AdminController.getUnapprovedAdmins();
        assert.called(await AdminService.getUnapprovedAdmins);
    }));

    it('should call admin service reactivateAdmin with correct parameters', test(async function () {
        this.stub(AdminService, 'reactivateAdmin');
        AdminController.reactivateAdmin(req.admin._id);
        assert.calledWith(await AdminService.reactivateAdmin, req.admin._id);
    }));

    it('should call admin service approveAdmin with correct parameters', test(async function () {
        this.stub(AdminService, 'approveAdmin');
        AdminController.approveAdmin(req.admin._id);
        assert.calledWith(await AdminService.approveAdmin, req.admin._id);
    }));

    it('should call admin service rejectAdmin with correct parameters', test(async function () {
        this.stub(AdminService, 'rejectAdmin');
        AdminController.rejectAdmin(req.admin._id);
        assert.calledWith(await AdminService.rejectAdmin, req.admin._id);
    }));

    it('should call admin service deleteAdmin with correct parameters', test(async function () {
        this.stub(AdminService, 'deleteAdmin');
        AdminController.deleteAdmin(req.admin._id, req.user._id);
        assert.calledWith(await AdminService.deleteAdmin, req.admin._id, req.user._id);
    }));
});