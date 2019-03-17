var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var axios = require('axios');
var ServiceService = require('../../service/ServiceService');
var ServiceRepository = require('../../repository/ServiceRepository');
var ServiceFactory = require('../factories/ServiceFactory');
var ServiceValidator = require('../../validators/ServiceValidator');
var ReviewRepository = require('../../repository/ReviewRepository');
var { ServerError } = require('../../errors/ServerError');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var recommendationServiceConfig = require('../../config');

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
                search: 'true',
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

    it('should call createService repository with correct parameters from createService service', test(async function () {
        this.stub(ServiceRepository, 'createService');
        this.stub(ServiceValidator, 'serviceValidator').returns('');
        await ServiceService.createService(req.user, req.body.serviceDetails);
        let tempServiceObject = req.body.serviceDetails;
        tempServiceObject.serviceImagePath = '/uploads/test@test.com/services/undefined';
        assert.calledWith(ServiceRepository.createService, req.user._id, tempServiceObject);
    }));

    it('should call createService repository with error in validation from createService service', test(function () {
        this.stub(ServiceRepository, 'createService');
        this.stub(ServiceValidator, 'serviceValidator').returns("error");
        return chai.assert.isRejected(ServiceService.createService(req.user._id, req.body.serviceDetails), ServerError, 'There was an error creating service.');Z
    }));

    it('should call getServices to retrieve search services from getServices service', test(async function () {
        this.stub(ServiceRepository, 'getServices').returns([]);
        this.stub(ReviewRepository, 'getAverageRating').returns([]);
        await ServiceService.getServices('', req.query.searchQuery, req.query.search, '', '');
        assert.calledWith(ServiceRepository.getServices, {  $text: { $search: req.query.searchQuery }, deleted: false });
    }));

    it('should call getServices to retrieve users services from getServices service', test(async function () {
        this.stub(ServiceRepository, 'getServices').returns([]);
        this.stub(ReviewRepository, 'getAverageRating').returns([]);
        await ServiceService.getServices(req.query.editOwner, '', '');
        assert.calledWith(ServiceRepository.getServices, { deleted: false, user: "test@test.com" });
    }));

    it('should call getServices to retrieve a categories services from getServices service', test(async function () {
        this.stub(ServiceRepository, 'getServices').returns([]);
        this.stub(ReviewRepository, 'getAverageRating').returns([]);
        await ServiceService.getServices('', '', '', service.category, service.subcategory);
        assert.calledWith(ServiceRepository.getServices, { deleted: false, category: service.category, subcategory: service.subcategory });
    }));

    it('should call getServices to retrieve all services from getServices service', test(async function () {
        this.stub(ServiceRepository, 'getServices').returns([]);
        this.stub(ReviewRepository, 'getAverageRating').returns([]);
        await ServiceService.getServices('', '', '', '', '');
        assert.calledWith(ServiceRepository.getServices, { deleted: false });
    }));

    it('should call getService repository with correct parameters from getService service', test(async function () {
        this.stub(ServiceRepository, 'getService').returns({_id: "5bda52305ccfd051484ea790" });
        this.stub(ReviewRepository, 'getAverageRating').returns([]);
        await ServiceService.getService(service._id);
        assert.calledWith(ServiceRepository.getService, { _id: "5bda52305ccfd051484ea790", deleted: false } );
    }));

    it('should call updateService repository with correct parameters from updateService service', test(async function () {
        this.stub(ServiceRepository, 'updateService');
        this.stub(ServiceValidator, 'serviceValidator').returns('');
        await ServiceService.updateService(req.user, req.body.serviceDetails);
        let tempServiceObject = req.body.serviceDetails;
        tempServiceObject.serviceImagePath = "/uploads/test@test.com/services/undefined";
        assert.calledWith(ServiceRepository.updateService, tempServiceObject);
    }));

    it('should call updateService repository with error in validation from updateService service', test(function () {
        this.stub(ServiceRepository, 'updateService');
        this.stub(ServiceValidator, 'serviceValidator').returns("error");
        return chai.assert.isRejected(ServiceService.updateService(req.body.serviceDetails), ServerError, 'There was an error updating service.');

    }));

    it('should call deleteService repository with merchant service owner from deleteService service', test(async function () {
        this.stub(ServiceRepository, 'deleteService');
        await ServiceService.deleteService(service._id);
        assert.calledWith(ServiceRepository.deleteService, service._id);
    }));

    it('should call getServices to retrieve recommended services from getRecommendations service', test(async function () {
        this.stub(ServiceRepository, 'getServices');
        this.stub(axios, 'get').returns(Promise.resolve({ data: "[ '5c495110d50aa425309f2da6'; '50'];[ '5c495114d50aa425309f3077'; '50'];[ '5c495114d50aa425309f3071'; '50']" }));
        this.stub(recommendationServiceConfig, 'recommendationServiceConnectionString').returns('');
        await ServiceService.getRecommendations(req.user);
        assert.calledWith(ServiceRepository.getServices,{ $or: [{ _id: '5c495110d50aa425309f2da6' }, { _id: '5c495114d50aa425309f3077' }, { _id: '5c495114d50aa425309f3071' }], deleted: false });
    }));

    it('should call getRecommendations services with error', test(async function () {
        this.stub(ServiceRepository, 'getServices');
        this.stub(axios, 'get').returns(Promise.reject({}));
        return chai.assert.isRejected(ServiceService.getRecommendations(req.user), ServerError, 'There was an error retrieving recommended services.');
    }));
});