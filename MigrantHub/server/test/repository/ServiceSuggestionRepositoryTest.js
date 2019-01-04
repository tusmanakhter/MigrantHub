var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var ServiceSuggestionRepository = require('../../repository/ServiceSuggestionRepository');
var ServiceSuggestionFactory = require('../factories/ServiceSuggestionFactory');
var ServiceSuggestion = require('../../models/ServiceSuggestion');
var { ServerError } = require('../../errors/ServerError');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Service suggestion Repository', function () {
  let req = {
    body: ServiceSuggestionFactory.serviceSuggestionObj(),
    serviceSuggestionId: "5bda52305ccfd051484ea790",
  };

  it('should successfully call mongodb save to createSuggestion', test(function () {
    this.stub(ServiceSuggestion.prototype, 'save').returns(Promise.resolve({}));
    ServiceSuggestionRepository.createSuggestion(req.body);
    assert.called(ServiceSuggestion.prototype.save);
    return chai.assert.isFulfilled(ServiceSuggestionRepository.createSuggestion(req.body), 'Service suggestion has been created.');
  }));

  it('should throw error, since there was a error saving service suggestion', test( function () {
    this.stub(ServiceSuggestion.prototype, 'save').returns(Promise.reject({}));
    ServiceSuggestionRepository.createSuggestion(req.body);
    assert.called(ServiceSuggestion.prototype.save);
    return chai.assert.isRejected(ServiceSuggestionRepository.createSuggestion(req.body), ServerError, 'There was an error saving service suggestion.');
  }));

  it('should successfully call mongodb find to getSuggestions', test(function () {
    this.stub(ServiceSuggestion, 'find').returns({exec: sinon.stub().returns(Promise.resolve({}))});
    ServiceSuggestionRepository.getSuggestions({ deleted: false });
    assert.calledWith(ServiceSuggestion.find, { deleted: false });
    return chai.assert.isFulfilled(ServiceSuggestionRepository.getSuggestions(req.body), {});
  }));

  it('should throw error, since there was a error getting all service suggestions', test(function () {
    this.stub(ServiceSuggestion, 'find').returns({exec: sinon.stub().returns(Promise.reject({}))});
    ServiceSuggestionRepository.getSuggestions({ deleted: false });
    assert.calledWith(ServiceSuggestion.find, { deleted: false });
    return chai.assert.isRejected(ServiceSuggestionRepository.getSuggestions({ deleted: false }), ServerError, 'There was an error retrieving service suggestions.');
  }));

  it('should successfully call mongodb updateOne to deleteSuggestion', test(function () {
    this.stub(ServiceSuggestion, 'updateOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
    this.stub(Date, 'now').returns('2018-12-19T00:32:22.749Z');
    ServiceSuggestionRepository.deleteSuggestion(req.serviceSuggestionId);
    assert.calledWith(ServiceSuggestion.updateOne, { _id: req.serviceSuggestionId}, { deleted: true, deletedDate: Date.now() });
    return chai.assert.isFulfilled(ServiceSuggestionRepository.deleteSuggestion(req.serviceSuggestionId), 'Service suggestion has been deleted.');
  }));

  it('should throw error, since there was a error deleting service suggestion', test(function () {
    this.stub(ServiceSuggestion, 'updateOne').returns({exec: sinon.stub().returns(Promise.reject({}))});
    this.stub(Date, 'now').returns('2018-12-19T00:32:22.749Z');
    ServiceSuggestionRepository.deleteSuggestion(req.serviceSuggestionId);
    assert.calledWith(ServiceSuggestion.updateOne, { _id: req.serviceSuggestionId}, { deleted: true, deletedDate: Date.now() });
    return chai.assert.isRejected(ServiceSuggestionRepository.deleteSuggestion(req.serviceSuggestionId), ServerError, 'There was an error deleting service suggestion');
  }));
});