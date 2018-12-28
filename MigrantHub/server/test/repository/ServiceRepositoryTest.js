var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var ServiceRepository = require('../../repository/ServiceRepository');
var ServiceFactory = require('../factories/ServiceFactory');
var Service = require('../../models/Service');
var { ServerError } = require('../../errors/ServerError');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Service Repository', function () {
    let req = {
            body: {
                serviceDetails: ServiceFactory.validServiceData()
            },
            user:{
                _id: "test@test.com"
            },
        },
        service = {
            _id: "5bda52305ccfd051484ea790",
            email: "test@hotmail.com"
        };

    it('should successfully call mongodb save to createService', test(function () {
        this.stub(Service.prototype, 'save').returns(Promise.resolve({}));
        return chai.assert.isFulfilled(ServiceRepository.createService(req.user._id, {}), 'Service has been created.');
    }));

    it('should throw error, since there was a error saving service', test( function () {
        this.stub(Service.prototype, 'save').returns(Promise.reject({}));
        return chai.assert.isRejected(ServiceRepository.createService(req.user._id, {}), ServerError, 'There was an error saving service.');
    }));

    it('should successfully call mongodb find to findServices', test(function () {
        this.stub(Service, 'find').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        ServiceRepository.getServices({ '$or': [{ serviceTitle: /test/gi }, { serviceSummary: /test/gi }], deleted: false });
        assert.calledWith(Service.find, { '$or': [{ serviceTitle: /test/gi }, { serviceSummary: /test/gi }], deleted: false });
    }));

    it('should throw error, since there was a error getting all services', test(function () {
        this.stub(Service, 'find').returns({exec: sinon.stub().returns(Promise.reject({}))});
        return chai.assert.isRejected(ServiceRepository.getServices({ '$or': [{ serviceTitle: /test/gi }, { serviceSummary: /test/gi }], deleted: false }), ServerError, 'There was an error retrieving services.');
    }));

    it('should successfully call mongodb findOne to findOneService', test(function () {
        this.stub(Service, 'findOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        ServiceRepository.getService({ _id: service._id, deleted: false });
        assert.calledWith(Service.findOne, { _id: service._id, deleted: false });
    }));

    it('should throw error, since there was a error getting service', test(function () {
        this.stub(Service, 'findOne').returns({exec: sinon.stub().returns(Promise.reject({}))});
        return chai.assert.isRejected(ServiceRepository.getService({ _id: service._id, deleted: false }), ServerError, 'There was an error retrieving service.');
    }));

    it('should successfully call mongodb findByIdAndUpdate to updateService', test(function () {
        this.stub(Service, 'findByIdAndUpdate').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        ServiceRepository.updateService(req.body.serviceDetails);
        let parsedServiceObject = req.body.serviceDetails;
        assert.calledWith(Service.findByIdAndUpdate, { _id: service._id}, parsedServiceObject, { new: true });
    }));

    it('should throw error, since there was a error updating service', test(function () {
        this.stub(Service, 'findByIdAndUpdate').returns({exec: sinon.stub().returns(Promise.reject({}))});
        return chai.assert.isRejected(ServiceRepository.updateService(req.body.serviceDetails), ServerError, 'There was an error updating service in db.');
    }));

    it('should successfully call mongodb updateOne to deleteService', test(function () {
        this.stub(Service, 'updateOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        this.stub(Date, 'now').returns('2018-12-19T00:32:22.749Z');
        ServiceRepository.deleteService(service._id);
        assert.calledWith(Service.updateOne, { _id: service._id }, { deleted: true, deletedDate: Date.now() });
    }));

    it('should throw error, since there was a error deleting service', test(function () {
        this.stub(Service, 'updateOne').returns({exec: sinon.stub().returns(Promise.reject({}))});
        return chai.assert.isRejected(ServiceRepository.deleteService(service._id), ServerError, 'There was an error deleting service.');
    }));
});