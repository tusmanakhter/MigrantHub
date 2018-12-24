var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var ServiceRepository = require('../../repository/ServiceRepository');
var ServiceFactory = require('../factories/ServiceFactory');
var Service = require('../../models/Service');
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
        ServiceRepository.createService(req.user._id, {});
        assert.calledWith(Service.prototype.save);
    }));

    it('should throw error, since there was a error saving service', test(async function () {
        this.stub(Service.prototype, 'save').returns(Promise.reject({}));
        try {
            chai.expect(await ServiceRepository.createService(req.user._id, {})).should.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));

    it('should successfully call mongodb find to findServices', test(function () {
        this.stub(Service, 'find').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        ServiceRepository.getServices({ '$or': [{ serviceTitle: /test/gi }, { serviceSummary: /test/gi }], deleted: false });
        assert.calledWith(Service.find, { '$or': [{ serviceTitle: /test/gi }, { serviceSummary: /test/gi }], deleted: false });
    }));

    it('should throw error, since there was a error getting all services', test(async function () {
        this.stub(Service, 'find').returns(Promise.reject({}));
        try {
            chai.expect(await ServiceRepository.getServices({ '$or': [{ serviceTitle: /test/gi }, { serviceSummary: /test/gi }], deleted: false })).should.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));

    it('should successfully call mongodb findOne to findOneService', test(function () {
        this.stub(Service, 'findOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        ServiceRepository.getService({ _id: service._id, deleted: false });
        assert.calledWith(Service.findOne, { _id: service._id, deleted: false });
    }));

    it('should throw error, since there was a error getting service', test(async function () {
        this.stub(Service, 'findOne').returns(Promise.reject({}));
        try {
            chai.expect(await ServiceRepository.getService({ _id: service._id, deleted: false })).should.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));

    it('should successfully call mongodb findByIdAndUpdate to updateService', test(function () {
        this.stub(Service, 'findByIdAndUpdate').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        ServiceRepository.updateService(req.body.serviceDetails);
        let parsedServiceObject = req.body.serviceDetails;
        assert.calledWith(Service.findByIdAndUpdate, { _id: service._id}, parsedServiceObject, { new: true });
    }));

    it('should throw error, since there was a error updating service', test(async function () {
        this.stub(Service, 'findByIdAndUpdate').returns(Promise.reject({}));
        try {
            chai.expect(await ServiceRepository.updateService(req.body.serviceDetails)).should.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));

    it('should successfully call mongodb updateOne to deleteService', test(async function () {
        this.stub(Service, 'updateOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        this.stub(Date, 'now').returns('2018-12-19T00:32:22.749Z');
        ServiceRepository.deleteService(service._id);
        assert.calledWith(Service.updateOne, { _id: service._id }, { deleted: true, deletedDate: Date.now() });
    }));

    it('should throw error, since there was a error deleting service', test(async function () {
        this.stub(Service, 'updateOne').returns(Promise.reject({}));
        try {
            chai.expect(await ServiceRepository.deleteService(req.service._id)).should.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));
});