var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var PinnedServiceRepository = require('../../repository/PinnedServiceRepository');
var PinnedService = require('../../models/PinnedService');
var { ServerError } = require('../../errors/ServerError');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Pinned Service Repository', function () {
    let req = {
            user:{
                _id: "test@test.com"
            },
        };
        service = {
            _id: "5bda52305ccfd051484ea790",
            email: "test@test.com"
        };

    it('should successfully call mongodb save to pinnedcreateService', test(function () {
        this.stub(PinnedService.prototype, 'save').returns(Promise.resolve({}));
        return chai.assert.isFulfilled(PinnedServiceRepository.createPinnedService(req.user._id), 'Pinned Service has been created.');
    }));

    it('should throw error, since there was a error saving pinned service', test( function () {
        this.stub(PinnedService.prototype, 'save').returns(Promise.reject({}));
        return chai.assert.isRejected(PinnedServiceRepository.createPinnedService(req.user._id), ServerError, 'There was an error creating pinned service.');
    }));

    it('should successfully call mongodb findOne to findOnePinnedService', test(function () {
        this.stub(PinnedService, 'findOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        PinnedServiceRepository.getPinnedService({ _id: service._id, serviceId: service._id, deleted: false });
        assert.calledWith(PinnedService.findOne, { _id: { _id: "5bda52305ccfd051484ea790", deleted: false, serviceId: "5bda52305ccfd051484ea790" }, pinnedList: { $elemMatch: { deleted: false, serviceId: undefined } }});
    }));

    it('should throw error, since there was a error getting pinned service', test(function () {
        this.stub(PinnedService, 'findOne').returns({exec: sinon.stub().returns(Promise.reject({}))});
        return chai.assert.isRejected(PinnedServiceRepository.getPinnedService({ _id: service._id, deleted: false }), ServerError, 'There was an error retrieving pinned service.');
    }));
});