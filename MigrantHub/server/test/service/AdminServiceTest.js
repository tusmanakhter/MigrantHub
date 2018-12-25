var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var AdminService = require('../../service/AdminService');
var AdminRepository = require('../../repository/AdminRepository');
var { ServerError } = require('../../errors/ServerError');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('admin service', function () {
    let req = {
        user:{
            _id: "test@test.com"
        },
        admin:{
            _id: "admin@test.com"
        },
        currentAdmin:{
            _id: "admin@test.com"
        },
    };

    it('should call admin repository getAdmins with correct parameters from getAdmins', test(async function () {
        this.stub(AdminRepository, 'getAdmins');
        await AdminService.getAdmins(req.user);
        assert.calledWith(AdminRepository.getAdmins, {_id: { $ne: req.user._id }, authorized: true, rejected: false, deleted: false,});
    }));

    it('should call admin repository getAdmins with correct parameters from getDeletedAdmins', test(async function () {
        this.stub(AdminRepository, 'getAdmins');
        await AdminService.getDeletedAdmins();
        assert.calledWith(AdminRepository.getAdmins, { deleted: true });
    }));

    it('should call admin repository getAdmins with correct parameters from getRejectedAdmins', test(async function () {
        this.stub(AdminRepository, 'getAdmins');
        await AdminService.getRejectedAdmins();
        assert.calledWith(AdminRepository.getAdmins, { authorized: false, rejected: true });
    }));

    it('should call admin repository getAdmins with correct parameters from getUnapprovedAdmins', test(async function () {
        this.stub(AdminRepository, 'getAdmins');
        await AdminService.getUnapprovedAdmins();
        assert.calledWith(AdminRepository.getAdmins, { authorized: false, rejected: false, deleted: false });
    }));

    it('should call admin repository updateAdminStatus with correct parameters from reactivateAdmin', test(async function () {
        this.stub(AdminRepository, 'updateAdminStatus');
        await AdminService.reactivateAdmin(req.admin._id);
        assert.calledWith(AdminRepository.updateAdminStatus, req.admin._id, { authorized: true, deleted: false, deletedDate: null });
    }));

    it('should call admin repository updateAdminStatus with correct parameters from approveAdmin', test(async function () {
        this.stub(AdminRepository, 'updateAdminStatus');
        await AdminService.approveAdmin(req.admin._id);
        assert.calledWith(AdminRepository.updateAdminStatus, req.admin._id, { authorized: true, rejected: false, rejectedDate: null });
    }));

    it('should call admin repository updateAdminStatus with correct parameters from rejectAdmin', test(async function () {
        this.stub(AdminRepository, 'updateAdminStatus');
        this.stub(Date, 'now').returns('2018-12-19T00:32:22.749Z');
        await AdminService.rejectAdmin(req.admin._id);
        assert.calledWith(AdminRepository.updateAdminStatus, req.admin._id, { rejected: true, rejectedDate: Date.now() });
    }));

    it('should call admin repository updateAdminStatus with correct parameters from deleteAdmin', test(async function () {
        this.stub(AdminRepository, 'updateAdminStatus');
        this.stub(Date, 'now').returns('2018-12-19T00:32:22.749Z');
        await AdminService.deleteAdmin(req.user._id, req.admin._id);
        assert.calledWith(AdminRepository.updateAdminStatus, req.admin._id, { authorized: false, deleted: true, deletedDate: Date.now() });
    }));

    it('should call admin repository updateAdminStatus with error in validation to deleteAdmin', test(async function () {
        this.stub(AdminRepository, 'updateAdminStatus');
        return chai.assert.isRejected(AdminService.deleteAdmin(req.admin, req.currentAdmin._id), ServerError, 'You cannot delete yourself.');
    }));
});