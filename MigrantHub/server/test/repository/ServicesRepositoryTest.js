var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var ServicesRepository = require('../../repository/ServicesRepository');
var ServicesFactory = require('../factories/ServicesFactory');
var Services = require('../../models/Services');

describe('Service Repository', function () {
    let service = {
        _id: "5bda52305ccfd051484ea790",
        email: "test@hotmail.com"
    };
    it('should successfully call mongodb save to createService', test(function () {
        this.stub(Services.prototype, 'save');
        ServicesRepository.createService('user id', 'service object');
        assert.calledWith(Services.prototype.save);
    }));

    it('should successfully call mongodb find to findServices', test(function () {
        this.stub(Services, 'find').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        ServicesRepository.findServices({ '$or': [{ serviceTitle: /test/gi }, { serviceSummary: /test/gi }], deleted: false });
        assert.calledWith(Services.find, { '$or': [{ serviceTitle: /test/gi }, { serviceSummary: /test/gi }], deleted: false });
    }));

    it('should successfully call mongodb findOne to findOneService', test(function () {
        this.stub(Services, 'findOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        ServicesRepository.findOneService({ _id: service._id, deleted: false });
        assert.calledWith(Services.findOne, { _id: service._id, deleted: false });
    }));

    it('should successfully call mongodb findByIdAndUpdate to updateService', test(function () {
        this.stub(Services, 'findByIdAndUpdate').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        ServicesRepository.updateService(ServicesFactory.validServiceData());
        let parsedServiceObject = ServicesFactory.validServiceData();
        assert.calledWith(Services.findByIdAndUpdate, { _id: service._id}, parsedServiceObject, { new: true });
    }));

    it('should successfully call mongodb updateOne to deleteService', test(async function () {
        this.stub(Services, 'updateOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        this.stub(Date, 'now').returns('2018-12-19T00:32:22.749Z');
        ServicesRepository.deleteService(service._id);
        assert.calledWith(Services.updateOne, { _id: service._id }, { deleted: true, deletedDate: Date.now() });
    }));
});