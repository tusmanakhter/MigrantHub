var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var SavedEventRepository = require('../../repository/SavedEventRepository');
var SavedEvent = require('../../models/SavedEvent');
var { ServerError } = require('../../errors/ServerError');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('SavedEvent Repository', function () {
  let req = {
    eventId: '5ca0d1d27a7b64c584d272ce',
    user: {
      _id: "test@test.com"
    },
    query: {
      offset: 0,
      limit: 10,
    }
  };

  it('should successfully call mongodb save to createSavedEvent', test(function () {
      this.stub(SavedEvent.prototype, 'save').returns(Promise.resolve({}));
      return chai.assert.isFulfilled(SavedEventRepository.createSavedEvent(req.user._id), 'Saved event has been created.');
  }));

  it('should throw error, since there was a error saving event', test( function () {
      this.stub(SavedEvent.prototype, 'save').returns(Promise.reject({}));
      return chai.assert.isRejected(SavedEventRepository.createSavedEvent(req.user._id), ServerError,
        'There was an error creating saved event.');
  }));

  it('should successfully call mongodb find to getSavedEvents with offset and limit', test(function () {
    this.stub(SavedEvent, 'aggregate').returns({skip: sinon.stub().returns({limit: sinon.stub()
      .returns({exec: sinon.stub().returns(Promise.resolve({}))})})});
    SavedEventRepository.getSavedEvents({ _id: req.user._id } , req.query.offset, req.query.limit);
    assert.calledWith(SavedEvent.aggregate, [
      { $match: { _id: req.user._id } },
      { $unwind: '$savedList' },
      { $replaceRoot: { newRoot: '$savedList' } },
      { $match: { deleted: false } },
    ]);
  }));

  it('should throw error, since there was a error getting all saved events with offset and limit', test(function () {
    this.stub(SavedEvent, 'aggregate').returns({skip: sinon.stub().returns({limit: sinon.stub()
      .returns({exec: sinon.stub().returns(Promise.reject({}))})})});
    return chai.assert.isRejected(SavedEventRepository.getSavedEvents({ _id: req.user._id } ,
      req.query.offset, req.query.limit), ServerError, 'There was an error retrieving saved events.');
  }));

  it('should successfully call mongodb findOne to getSavedEvents', test(function () {
    this.stub(SavedEvent, 'findOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
    SavedEventRepository.getSavedEvents({ _id: req.user._id } , undefined, undefined);
    assert.calledWith(SavedEvent.findOne, { _id: req.user._id });
  }));

  it('should throw error, since there was a error getting all saved events', test(function () {
    this.stub(SavedEvent, 'findOne').returns({exec: sinon.stub().returns(Promise.reject({}))});
    return chai.assert.isRejected(SavedEventRepository.getSavedEvents({ _id: req.user._id }, undefined,
      undefined), ServerError, 'There was an error retrieving saved events.');
  }));


  it('should successfully call mongodb findOne to saved eventz', test(function () {
    this.stub(SavedEvent, 'findOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
    SavedEventRepository.getSavedEvent(req.user._id, req.eventId);
    assert.calledWith(SavedEvent.findOne, {_id: req.user._id, 'savedList._id': req.eventId});
  }));

  it('should throw error, since there was a error getting service', test(function () {
    this.stub(SavedEvent, 'findOne').returns({exec: sinon.stub().returns(Promise.reject({}))});
    return chai.assert.isRejected(SavedEventRepository.getSavedEvent(req.user._id, req.eventId),
      ServerError, 'There was an error retrieving saved event.');
  }));

  it('should successfully call mongodb update to addSavedEvent', test(function () {
    this.stub(SavedEvent, 'update').returns({exec: sinon.stub().returns(Promise.resolve({}))});
    SavedEventRepository.addSavedEvent(req.user._id, {_id: req.eventId, deleted: false});
    assert.calledWith(SavedEvent.update, { _id: req.user._id },
      { $push: { savedList: {_id: req.eventId, deleted: false} } }, { new: true });
  }));

  it('should throw error, since there was a error adding saved event', test(function () {
    this.stub(SavedEvent, 'update').returns({exec: sinon.stub().returns(Promise.reject({}))});
    return chai.assert.isRejected(SavedEventRepository.addSavedEvent(req.user._id,
      {_id: req.eventId, deleted: false}), ServerError, 'There was an error saving event in db.');
  }));

  it('should successfully call mongodb update to updateSavedEvent', test(function () {
    this.stub(SavedEvent, 'update').returns({exec: sinon.stub().returns(Promise.resolve({}))});
    SavedEventRepository.updateSavedEvent(req.user._id, req.eventId, {});
    assert.calledWith(SavedEvent.update, {_id: req.user._id, 'savedList._id': req.eventId,}, {});
  }));

  it('should throw error, since there was a error updating saved event', test(function () {
    this.stub(SavedEvent, 'update').returns({exec: sinon.stub().returns(Promise.reject({}))});
    return chai.assert.isRejected(SavedEventRepository.updateSavedEvent(req.user._id, req.eventId, {}),
      ServerError, 'There was an error updating saved event.');
  }));
});