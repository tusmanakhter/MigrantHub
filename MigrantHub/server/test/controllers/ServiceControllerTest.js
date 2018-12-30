var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var ServiceController = require('../../controllers/ServiceController')
var ServiceFactory = require('../factories/ServiceFactory');
var ServiceService = require('../../service/ServiceService');

describe('Service controller', function () {
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
            email: "test@hotmail.com",
            category : "Employment",
            subcategory : "SmallBusiness",
        };

    it('should call createService service with correct parameters from createService controller', test(async function () {
        this.stub(ServiceService, 'createService');
        await ServiceController.createService(req.user, req.body.serviceDetails);
        assert.calledWith(ServiceService.createService, req.user, req.body.serviceDetails);
    }));

    it('should call getServices service with correct parameters from createService controller', test(async function () {
        this.stub(ServiceService, 'getServices');
        await ServiceController.getServices(req.query.editOwner, req.query.searchQuery, req.query.search, service.category, service.subcategory );
        assert.calledWith(ServiceService.getServices, req.query.editOwner, req.query.searchQuery, req.query.search, service.category, service.subcategory);
    }));

    it('should call getService service with correct parameters from getService controller', test(async function () {
        this.stub(ServiceService, 'getService');
        await ServiceController.getService(service._id);
        assert.calledWith(ServiceService.getService, service._id);
    }));

    it('should call updateService service with correct parameters from updateService controller', test(async function () {
        this.stub(ServiceService, 'updateService');
        await ServiceController.updateService(req.body.serviceDetails);
        assert.calledWith(ServiceService.updateService, req.body.serviceDetails);
    }));

    it('should call deleteService service with merchant service owner from deleteService controller', test(async function () {
        this.stub(ServiceService, 'deleteService');
        await ServiceController.deleteService(service._id);
        assert.calledWith(ServiceService.deleteService, service._id);
    }));
});