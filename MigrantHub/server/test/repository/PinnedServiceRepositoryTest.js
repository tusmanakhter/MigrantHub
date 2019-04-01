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
    query: {
      offset: 0,
      limit: 10,
    }
  };
  let service = {
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

  it('should successfully call mongodb findByIdAndUpdate to updatePinnedService', test(function () {
    this.stub(PinnedService, 'findByIdAndUpdate').returns({exec: sinon.stub().returns(Promise.resolve({}))});
    PinnedServiceRepository.updatePinnedService(req.user._id, {});
    assert.calledWith(PinnedService.findByIdAndUpdate, { _id: req.user._id }, {}, { new: true });
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

  it('should successfully call mongodb find to getPinnedServices with offset and limit', test(function () {
    this.stub(PinnedService, 'aggregate').returns({skip: sinon.stub().returns({limit: sinon.stub()
      .returns({exec: sinon.stub().returns(Promise.resolve({}))})})});
    PinnedServiceRepository.getPinnedServices({ _id: req.user._id } , req.query.offset, req.query.limit);
    assert.calledWith(PinnedService.aggregate, [
      { $match: { _id: req.user._id } },
      { $unwind: '$pinnedList' },
      { $replaceRoot: { newRoot: '$pinnedList' } },
      { $match: { deleted: false } },
    ]);
  }));

  it('should throw error, since there was a error getting all pinned services with offset and limit', test(function () {
    this.stub(PinnedService, 'aggregate').returns({skip: sinon.stub().returns({limit: sinon.stub()
      .returns({exec: sinon.stub().returns(Promise.reject({}))})})});
    return chai.assert.isRejected(PinnedServiceRepository.getPinnedServices({ _id: req.user._id } ,
      req.query.offset, req.query.limit), ServerError, 'There was an error retrieving pinned services.');
  }));


  it('should successfully call mongodb update to updatePinnedServiceState', test(function () {
    this.stub(PinnedService, 'update').returns({exec: sinon.stub().returns(Promise.resolve({}))});
    PinnedServiceRepository.updatePinnedServiceState(req.user._id, service._id, true);
    assert.calledWith(PinnedService.update, { _id: req.user._id, 'pinnedList.serviceId': service._id },
      { $set: { 'pinnedList.$.deleted': true } }, { new: true });
  }));

  it('should throw error, since there was a error updating pinned service state', test(function () {
    this.stub(PinnedService, 'update').returns({exec: sinon.stub().returns(Promise.reject({}))});
    return chai.assert.isRejected(PinnedServiceRepository.updatePinnedServiceState(req.user._id, service._id, true),
      ServerError, 'There was an error updating pinned service in db.');
  }));
});