var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var SavedEventController = require('../../controllers/SavedEventController');
var SavedEventService = require('../../service/SavedEventService');

describe('Service controller', function () {
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

  it('should call getSavedEvents service with correct parameters from getSavedEvents controller', test(async function () {
    this.stub(SavedEventService, 'getSavedEvents');
    await SavedEventController.getSavedEvents(req.user, req.query.offset, req.query.limit);
    assert.calledWith(SavedEventService.getSavedEvents, req.user, req.query.offset, req.query.limit);
  }));

  it('should call addSavedEvent service with correct parameters from addSavedEvent controller', test(async function () {
    this.stub(SavedEventService, 'addSavedEvent');
    await SavedEventController.addSavedEvent(req.user, req.eventId);
    assert.calledWith(SavedEventService.addSavedEvent, req.user, req.eventId);
  }));

  it('should call deleteSavedEvent service with right parameters from deleteSavedEvent controller', test(async function () {
    this.stub(SavedEventService, 'deleteSavedEvent');
    await SavedEventController.deleteSavedEvent(req.user, req.eventId);
    assert.calledWith(SavedEventService.deleteSavedEvent, req.user, req.eventId);
  }));
});