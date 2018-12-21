var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var ServicesService = require('../../service/ServicesService');
var ServicesRepository = require('../../repository/ServicesRepository');
var ServicesFactory = require('../factories/ServicesFactory');
var chai = require('chai');
var ServiceValidator = require('../../validators/ServiceValidator');

describe('Service Service', function () {
    let req = {
            body: {
                serviceDetails: ServicesFactory.validServiceData()
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
        this.stub(ServicesRepository, 'createService');
        this.stub(ServiceValidator, 'serviceValidator').returns('');
        ServicesService.createService(req.user, ServicesFactory.validServiceData());
        let tempServiceObject = ServicesFactory.validServiceData();
        tempServiceObject.serviceImagePath = '/uploads/test@test.com/services/undefined';
        assert.calledWith(await ServicesRepository.createService, req.user._id, tempServiceObject);
    }));

    it('should call createService repository with error in validation from createService service', test(async function () {
        this.stub(ServicesRepository, 'createService');
        this.stub(ServiceValidator, 'serviceValidator').returns("error");
        try {
            chai.expect(await ServicesRepository.createService(req.user._id, ServicesFactory.validServiceData())).to.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));

    it('should call getServices to retrieve users services from getServices service', test(async function () {
        this.stub(ServicesRepository, 'findServices');
        ServicesService.getServices('', req.query.searchQuery, req.query.search);
        assert.calledWith(await ServicesRepository.findServices, { '$or': [{ serviceTitle: /test/gi }, { serviceSummary: /test/gi }], deleted: false });
    }));

    it('should call getServices to retrieve search services from getServices service', test(async function () {
        this.stub(ServicesRepository, 'findServices');
        ServicesService.getServices(req.query.editOwner, '', '');
        assert.calledWith(await ServicesRepository.findServices, { deleted: false, email: "test@test.com" });
    }));

    it('should call getServices to retrieve all services from getServices service', test(async function () {
        this.stub(ServicesRepository, 'findServices');
        ServicesService.getServices('', '', '');
        assert.calledWith(await ServicesRepository.findServices, { deleted: false });
    }));

    it('should call getService repository with correct parameters from getService service', test(async function () {
        this.stub(ServicesRepository, 'findOneService');
        ServicesService.getService(service._id);
        assert.calledWith(await ServicesRepository.findOneService, { _id: "5bda52305ccfd051484ea790", deleted: false } );
    }));

    it('should call updateService repository with correct parameters from updateService service', test(async function () {
        this.stub(ServicesRepository, 'updateService');
        this.stub(ServiceValidator, 'serviceValidator').returns('');
        ServicesService.updateService(req.user, ServicesFactory.validServiceData());
        let tempServiceObject = ServicesFactory.validServiceData();
        tempServiceObject.serviceImagePath = "/uploads/test@test.com/services/undefined";
        assert.calledWith(await ServicesRepository.updateService, tempServiceObject);
    }));

    it('should call updateService repository with error in validation from updateService service', test(async function () {
        this.stub(ServicesRepository, 'updateService');
        this.stub(ServiceValidator, 'serviceValidator').returns("error");
        try {
            chai.expect(await ServicesRepository.updateService(ServicesFactory.validServiceData())).to.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));

    it('should call deleteService repository with merchant service owner from deleteService service', test(async function () {
        this.stub(ServicesRepository, 'deleteService');
        ServicesService.deleteService(service._id);
        assert.calledWith(await ServicesRepository.deleteService, service._id);
    }));
});