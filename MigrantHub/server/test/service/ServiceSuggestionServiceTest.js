var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var ServiceSuggestionService = require('../../service/ServiceSuggestionService');
var ServiceSuggestionRepository = require('../../repository/ServiceSuggestionRepository');
var ServiceRepository = require('../../repository/ServiceRepository');
var ServiceSuggestionFactory = require('../factories/ServiceSuggestionFactory');
var { ServerError } = require('../../errors/ServerError');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Service Service', function () {
  let req = {
    body: ServiceSuggestionFactory.serviceSuggestionObj(),
    serviceSuggestionId: "5bda52305ccfd051484ea790",
  },
  serviceSuggestion = ServiceSuggestionFactory.serviceSuggestion();

  it('should call createSuggestion repo with correct parameters from createSuggestion service', test(async function () {
    this.stub(ServiceSuggestionRepository, 'createSuggestion');
    this.stub(ServiceSuggestionRepository, 'getSuggestions').returns([]);
    this.stub(ServiceRepository, 'getServices').returns([]);
    await ServiceSuggestionService.createSuggestion(req.body);
    assert.calledWith(ServiceSuggestionRepository.createSuggestion, req.body);
  }));

  it('should call not call repo with duplicate suggestion and have error', test(async function () {
    this.stub(ServiceSuggestionRepository, 'createSuggestion');
    this.stub(ServiceSuggestionRepository, 'getSuggestions').returns([serviceSuggestion]);
    this.stub(ServiceRepository, 'getServices').returns([]);
    chai.assert.isRejected(ServiceSuggestionService.createSuggestion(req.body), ServerError, 'There was an error adding suggestion');
}));

  it('should call getSuggestions repo from getSuggestions service', test(async function () {
    this.stub(ServiceSuggestionRepository, 'getSuggestions');
    await ServiceSuggestionService.getSuggestions({ deleted: false });
    assert.calledWith(ServiceSuggestionRepository.getSuggestions, { deleted: false });
  }));

  it('should call deleteSuggestion repo from deleteSuggestion service', test(async function () {
    this.stub(ServiceSuggestionRepository, 'deleteSuggestion');
    await ServiceSuggestionService.deleteSuggestion(req.serviceSuggestionId);
    assert.calledWith(ServiceSuggestionRepository.deleteSuggestion, req.serviceSuggestionId);
  }));
});