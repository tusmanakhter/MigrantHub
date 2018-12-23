var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var ServicesService = require('../../service/ServicesService');
var ServiceRepository = require('../../repository/ServiceRepository');
var ServiceFactory = require('../factories/ServiceFactory');
var ServiceValidator = require('../../validators/ServiceValidator');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Service Service', function () {
    let req = {
            body: {
                serviceDetails: ServiceFactory.validServiceData()
            },
            user: {
                _id: "test@test.com"
            },
            query: {
                _id: "5bda52305ccfd051484ea790",
                editOwner: "test@test.com",
                search: true,
                searchQuery: 'test',
            },
            params: {
                id: "5bda52305ccfd051484ea790"
            }
        },
        service = {
            _id: "5bda52305ccfd051484ea790",
            email: "test@hotmail.com"
        };

    it('should call createService repository with correct parameters from createService service', test(async function () {
        this.stub(ServiceRepository, 'createService');
        this.stub(ServiceValidator, 'serviceValidator').returns('');
        ServicesService.createService(req.user, req.body.serviceDetails);
        let tempServiceObject = req.body.serviceDetails;
        tempServiceObject.serviceImagePath = '/uploads/test@test.com/services/undefined';
        assert.calledWith(await ServiceRepository.createService, req.user._id, tempServiceObject);
    }));

    it('should call createService repository with error in validation from createService service', test(async function () {
        this.stub(ServiceRepository, 'createService');
        this.stub(ServiceValidator, 'serviceValidator').returns("error");
        try {
            chai.expect(await ServiceRepository.createService(req.user._id, req.body.serviceDetails)).should.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));

    it('should call getServices to retrieve users services from getServices service', test(async function () {
        this.stub(ServiceRepository, 'getServices');
        ServicesService.getServices('', req.query.searchQuery, req.query.search);
        assert.calledWith(await ServiceRepository.getServices, { '$or': [{ serviceTitle: /test/gi }, { serviceSummary: /test/gi }], deleted: false });
    }));

    it('should call getServices to retrieve search services from getServices service', test(async function () {
        this.stub(ServiceRepository, 'getServices');
        ServicesService.getServices(req.query.editOwner, '', '');
        assert.calledWith(await ServiceRepository.getServices, { deleted: false, user: "test@test.com" });
    }));

    it('should call getServices to retrieve all services from getServices service', test(async function () {
        this.stub(ServiceRepository, 'getServices');
        ServicesService.getServices('', '', '');
        assert.calledWith(await ServiceRepository.getServices, { deleted: false });
    }));

    it('should call getService repository with correct parameters from getService service', test(async function () {
        this.stub(ServiceRepository, 'getService');
        ServicesService.getService(service._id);
        assert.calledWith(await ServiceRepository.getService, { _id: "5bda52305ccfd051484ea790", deleted: false } );
    }));

    it('should call updateService repository with correct parameters from updateService service', test(async function () {
        this.stub(ServiceRepository, 'updateService');
        this.stub(ServiceValidator, 'serviceValidator').returns('');
        ServicesService.updateService(req.user, req.body.serviceDetails);
        let tempServiceObject = req.body.serviceDetails;
        tempServiceObject.serviceImagePath = "/uploads/test@test.com/services/undefined";
        assert.calledWith(await ServiceRepository.updateService, tempServiceObject);
    }));

    it('should call updateService repository with error in validation from updateService service', test(async function () {
        this.stub(ServiceRepository, 'updateService');
        this.stub(ServiceValidator, 'serviceValidator').returns("error");
        try {
            chai.expect(await ServiceRepository.updateService(req.body.serviceDetails)).should.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));

    it('should call deleteService repository with merchant service owner from deleteService service', test(async function () {
        this.stub(ServiceRepository, 'deleteService');
        ServicesService.deleteService(service._id);
        assert.calledWith(await ServiceRepository.deleteService, service._id);
    }));
});