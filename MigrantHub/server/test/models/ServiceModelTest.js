var chai = require('chai');
var expect = chai.expect;
var Service = require('../../models/Service');

describe('Services model', function() {
    it('Should be invalid if user or serviceTitle is empty', function(done) {
        var service = new Service();

        service.validate(function(err) {
            expect(err.errors.user).to.exist;
            expect(err.errors.serviceTitle).to.exist;
            done();
        });
    });
});