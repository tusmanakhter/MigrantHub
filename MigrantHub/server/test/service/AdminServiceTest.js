var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var AdminService = require('../../service/AdminService');
var AdminRepository = require('../../repository/AdminRepository');
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
        AdminService.getAdmins(req.user);
        assert.calledWith(await AdminRepository.getAdmins, {_id: { $ne: req.user._id }, authorized: true, rejected: false, deleted: false,});
    }));

    it('should call admin repository getAdmins with correct parameters from getDeletedAdmins', test(async function () {
        this.stub(AdminRepository, 'getAdmins');
        AdminService.getDeletedAdmins();
        assert.calledWith(await AdminRepository.getAdmins, { deleted: true });
    }));

    it('should call admin repository getAdmins with correct parameters from getRejectedAdmins', test(async function () {
        this.stub(AdminRepository, 'getAdmins');
        AdminService.getRejectedAdmins();
        assert.calledWith(await AdminRepository.getAdmins, { authorized: false, rejected: true });
    }));

    it('should call admin repository getAdmins with correct parameters from getUnapprovedAdmins', test(async function () {
        this.stub(AdminRepository, 'getAdmins');
        AdminService.getUnapprovedAdmins();
        assert.calledWith(await AdminRepository.getAdmins, { authorized: false, rejected: false, deleted: false });
    }));

    it('should call admin repository updateAdminStatus with correct parameters from reactivateAdmin', test(async function () {
        this.stub(AdminRepository, 'updateAdminStatus');
        AdminService.reactivateAdmin(req.admin._id);
        assert.calledWith(await AdminRepository.updateAdminStatus, req.admin._id, { authorized: true, deleted: false, deletedDate: null });
    }));

    it('should call admin repository updateAdminStatus with correct parameters from approveAdmin', test(async function () {
        this.stub(AdminRepository, 'updateAdminStatus');
        AdminService.approveAdmin(req.admin._id);
        assert.calledWith(await AdminRepository.updateAdminStatus, req.admin._id, { authorized: true, rejected: false, rejectedDate: null });
    }));

    it('should call admin repository updateAdminStatus with correct parameters from rejectAdmin', test(async function () {
        this.stub(AdminRepository, 'updateAdminStatus');
        this.stub(Date, 'now').returns('2018-12-19T00:32:22.749Z');
        AdminService.rejectAdmin(req.admin._id);
        assert.calledWith(await AdminRepository.updateAdminStatus, req.admin._id, { rejected: true, rejectedDate: Date.now() });
    }));

    it('should call admin repository updateAdminStatus with correct parameters from deleteAdmin', test(async function () {
        this.stub(AdminRepository, 'updateAdminStatus');
        this.stub(Date, 'now').returns('2018-12-19T00:32:22.749Z');
        AdminService.deleteAdmin(req.user._id, req.admin._id);
        assert.calledWith(await AdminRepository.updateAdminStatus, req.admin._id, { authorized: false, deleted: true, deletedDate: Date.now() });
    }));

    it('should call admin repository updateAdminStatus with error in validation to deleteAdmin', test(async function () {
        this.stub(AdminRepository, 'updateAdminStatus');
        try {
            chai.expect(await AdminService.deleteAdmin(req.admin._id, req.currentAdmin._id)).should.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));
});