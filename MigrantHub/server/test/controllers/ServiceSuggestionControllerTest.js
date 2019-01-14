var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var ServiceSuggestionController = require('../../controllers/ServiceSuggestionController')
var ServiceSuggestionFactory = require('../factories/ServiceSuggestionFactory');
var ServiceSuggestionService = require('../../service/ServiceSuggestionService');

describe('Service suggestion controller', function () {
  let req = {
    body: ServiceSuggestionFactory.serviceSuggestionObj(),
    serviceSuggestionId: "5bda52305ccfd051484ea790",
  };

  it('should call createSuggestion service with correct parameters from createSuggestion controller method', test(async function () {
    this.stub(ServiceSuggestionService, 'createSuggestion');
    await ServiceSuggestionController.createSuggestion(req.body);
    assert.calledWith(ServiceSuggestionService.createSuggestion, req.body);
  }));

  it('should call getSuggestions service with correct parameters from getSuggestions controller method', test(async function () {
    this.stub(ServiceSuggestionService, 'getSuggestions');
    await ServiceSuggestionController.getSuggestions();
    assert.called(ServiceSuggestionService.getSuggestions);
  }));

  it('should call deleteSuggestion service with serviceSuggestionId from deleteSuggestion controller method', test(async function () {
    this.stub(ServiceSuggestionService, 'deleteSuggestion');
    await ServiceSuggestionController.deleteSuggestion(req.serviceSuggestionId);
    assert.calledWith(ServiceSuggestionService.deleteSuggestion, req.serviceSuggestionId);
  }));
});