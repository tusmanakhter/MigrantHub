var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var PinnedServiceController = require('../../controllers/PinnedServiceController')
var ServiceFactory = require('../factories/ServiceFactory');
var PinnedService = require('../../service/PinnedServiceService');

describe('Service controller', function () {
    let req = {
            user: {
                _id: "test@test.com"
            },
        },
        service = {
            _id: "5bda52305ccfd051484ea790",
        };

    it('should call getPinnedService service with correct parameters from getPinnedService controller', test(async function () {
        this.stub(PinnedService, 'getPinnedServices');
        await PinnedServiceController.getPinnedServices(service._id, 10, 10);
        assert.calledWith(PinnedService.getPinnedServices, service._id, 10 , 10);
    }));

    it('should call updatePinnedService service with correct parameters from updatePinnedService controller', test(async function () {
        this.stub(PinnedService, 'updatePinnedService');
        await PinnedServiceController.updatePinnedService(req.user._id, 10);
        assert.calledWith(PinnedService.updatePinnedService, req.user._id , 10);
    }));

    it('should call deletePinnedService service with merchant service owner from deletePinnedService controller', test(async function () {
        this.stub(PinnedService, 'deletePinnedService');
        await PinnedServiceController.deletePinnedService(req.user._id, service._id);
        assert.calledWith(PinnedService.deletePinnedService, req.user._id, service._id);
    }));

});