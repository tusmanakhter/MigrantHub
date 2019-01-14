var chai = require('chai');
var expect = chai.expect;
var ServiceSuggestion = require('../../models/ServiceSuggestion');

describe('ServiceSuggestion model', function() {
  it('Should be invalid serviceTitle or serviceSummary is empty', function(done) {
    var serviceSuggestion = new ServiceSuggestion();

    serviceSuggestion.validate(function(err) {
        expect(err.errors.serviceTitle).to.exist;
        expect(err.errors.serviceSummary).to.exist;
        done();
    });
  });
});