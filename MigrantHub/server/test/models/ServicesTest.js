var chai = require('chai');
var expect = chai.expect;
var Services = require('../../models/Services');

describe('Services model', function() {
    it('Should be invalid if email, serviceTitle, serviceDescription or serviceSummary is empty', function(done) {
        var services = new Services();

        services.validate(function(err) {
            expect(err.errors.email).to.exist;
            expect(err.errors.serviceTitle).to.exist;
            expect(err.errors.serviceDescription).to.exist;
            expect(err.errors.serviceSummary).to.exist;
            done();
        });
    });
});