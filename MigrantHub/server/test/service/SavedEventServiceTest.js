var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var SavedEventFactory = require('../factories/SavedEventFactory');
var SavedEventService = require('../../service/SavedEventService');
var SavedEventRepository = require('../../repository/SavedEventRepository');
var EventRepository = require('../../repository/EventRepository');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('SavedEvent Service', function () {
  let req = {
    eventId: '5c987e1a0c6e2045a79958f4',
    eventId2: '5c987e1a0c6e2045a79958f5',
    user: {
      _id: "test@test.com"
    },
    query: {
      offset: 0,
      limit: 10,
    },
    body: SavedEventFactory.validSavedEventData()
  };

  it('should call createSavedEvent repository with correct parameters from createSavedEvent service',
    test(async function () {
      this.stub(SavedEventRepository, 'createSavedEvent');
      await SavedEventService.createSavedEvent(req.user._id);
      assert.calledWith(SavedEventRepository.createSavedEvent, req.user._id);
  }));

  it('should call getSavedEvents repository with correct parameters from getSavedEvents service (no events retrieved)',
    test(async function () {
    this.stub(SavedEventRepository, 'getSavedEvents').returns([]);
    await SavedEventService.getSavedEvents(req.user, req.query.offset, req.query.limit);
    assert.calledWith(SavedEventRepository.getSavedEvents, req.user, req.query.offset, req.query.limit);
  }));

  it('should call getSavedEvents repository with correct parameters from getSavedEvents service (events retrieved)',
    test(async function () {
    this.stub(SavedEventRepository, 'getSavedEvents').returns(req.body.savedList);
    this.stub(EventRepository, 'getEvents');
    await SavedEventService.getSavedEvents(req.user, req.query.offset, req.query.limit);
    assert.calledWith(SavedEventRepository.getSavedEvents, req.user, req.query.offset, req.query.limit);
    assert.calledWith(EventRepository.getEvents, {$or: [{ _id: "5c987e1a0c6e2045a79958f4" },
      { _id: "5c987e1a0c6e2045a79958f5" }] ,deleted: false});
  }));

  it('should call addSavedEvent repository with correct parameters from addSavedEvent service', test(async function () {
    this.stub(SavedEventRepository, 'getSavedEvent').returns(null);
    this.stub(SavedEventRepository, 'addSavedEvent');
    await SavedEventService.addSavedEvent(req.user, req.eventId);
    assert.calledWith(SavedEventRepository.getSavedEvent, req.user._id, req.eventId);
    assert.calledWith(SavedEventRepository.addSavedEvent, req.user._id, { _id: req.eventId, deleted: false } );
  }));

  it('should call updateSavedEvent repository with correct parameters from addSavedEvent service to update saved event ' +
    'from deleted to not deleted', test(async function () {
    this.stub(SavedEventRepository, 'getSavedEvent').returns(req.body);
    this.stub(SavedEventRepository, 'updateSavedEvent');
    await SavedEventService.addSavedEvent(req.user, req.eventId2);
    assert.calledWith(SavedEventRepository.getSavedEvent, req.user._id, req.eventId2);
    assert.calledWith(SavedEventRepository.updateSavedEvent, req.user._id, req.eventId2,
      { $set: { 'savedList.$.deleted': false, 'savedList.$.deletedDate': null } });
  }));

  it('should call updateSavedEvent repository with correct parameters from deleteSavedEvent service',
    test(async function () {
    this.stub(SavedEventRepository, 'updateSavedEvent');
    this.stub(Date, 'now').returns('2018-12-19T00:32:22.749Z');
    await SavedEventService.deleteSavedEvent(req.user, req.eventId);
    assert.calledWith(SavedEventRepository.updateSavedEvent, req.user._id, req.eventId, { $set: { 'savedList.$.deleted': true,
      'savedList.$.deletedDate': '2018-12-19T00:32:22.749Z' }});
  }));
});