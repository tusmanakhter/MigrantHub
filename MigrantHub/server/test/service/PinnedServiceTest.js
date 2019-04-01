var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var PinnedService = require('../../service/PinnedServiceService');
var PinnedServiceRepository = require('../../repository/PinnedServiceRepository');
var PinnedServiceFactory = require('../factories/PinnedServiceFactory');
var ServiceRepository = require('../../repository/ServiceRepository');
var ReviewRepository = require('../../repository/ReviewRepository');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Pinned Service', function () {
  let req = {
    user: {
      _id: "test@test.com"
    },
    body: PinnedServiceFactory.validPinnedServiceData(),
    query: {
      offset: 0,
      limit: 10,
    }
  };
  let service = {
    _id: "5bda52305ccfd051484ea790",
    email: "test@test.com"
  };

  it('should call createPinnedService repository with correct parameters from createPinnedService service',
    test(async function () {
      this.stub(PinnedServiceRepository, 'createPinnedService');
      await PinnedService.createPinnedService(req.user._id);
      assert.calledWith(PinnedServiceRepository.createPinnedService, req.user._id);
  }));

  it('should call updatePinnedServiceState repository with correct parameters from updatePinnedService ' +
    'service (pinned service found)',
    test(async function () {
      this.stub(PinnedServiceRepository, 'getPinnedService').returns(req.body.pinnedList);
      this.stub(PinnedServiceRepository, 'updatePinnedServiceState');
      await PinnedService.updatePinnedService(req.user._id, service._id);
      assert.calledWith(PinnedServiceRepository.updatePinnedServiceState, req.user._id, service._id, false);
    }));

  it('should call updatePinnedServiceState repository with correct parameters from updatePinnedService service ' +
    '(pinned service not found)',
    test(async function () {
      this.stub(PinnedServiceRepository, 'getPinnedService').returns(null);
      this.stub(PinnedServiceRepository, 'updatePinnedService');
      await PinnedService.updatePinnedService(req.user._id, service._id);
      assert.calledWith(PinnedServiceRepository.updatePinnedService, req.user._id, { $push: { pinnedList:
        { serviceId: service._id, deleted: false } } });
  }));

  it('should call getPinnedService repository with correct parameters from getPinnedService service',
    test(async function () {
      this.stub(PinnedServiceRepository, 'getPinnedService');
      await PinnedService.getPinnedService(req.user._id, service._id);
      assert.calledWith(PinnedServiceRepository.getPinnedService, req.user._id, service._id, false);
    }));

  it('should call getPinnedServices repository to retrieve pinned services from getPinnedServices service ' +
    '(No pinned service)', test(async function () {
    this.stub(PinnedServiceRepository, 'getPinnedServices').returns([]);
    await PinnedService.getPinnedServices(req.user._id, req.query.offset, req.query.limit);
    assert.calledWith(PinnedServiceRepository.getPinnedServices, { _id: req.user._id }, req.query.offset,
      req.query.limit);
  }));

  it('should call getPinnedServices repository to retrieve pinned services from getPinnedServices service ' +
    '(Pinned service found)', test(async function () {
    this.stub(PinnedServiceRepository, 'getPinnedServices').returns(req.body.pinnedList);
    this.stub(ServiceRepository, 'getServices').returns([]);
    this.stub(ReviewRepository, 'getAverageRating');
    await PinnedService.getPinnedServices(req.user._id, req.query.offset, req.query.limit);
    assert.calledWith(ServiceRepository.getServices, {$or: [{ _id: "5c8c6f39785ab592cc0974d4" },
      { _id: "5c8c6f39785ab592cc0974d9" }], deleted: false});
  }));

  it('should call updatePinnedServiceState repository with correct parameters from deletePinnedService service',
    test(async function () {
      this.stub(PinnedServiceRepository, 'updatePinnedServiceState');
      await PinnedService.deletePinnedService(req.user._id, service._id);
      assert.calledWith(PinnedServiceRepository.updatePinnedServiceState, req.user._id, service._id, true);
    }));
});