var expect = require('chai').expect;

var Job = require('../../models/Job');

describe('Job', function() {
  it('should be invalid if user, title, description, positionType, companyName, contactEmail, ' +
    'contactPhone, location  or dateCreated is empty', function(done) {
    var job = new Job();

    job.validate(function(err) {
      expect(err.errors.user).to.exist;
      expect(err.errors.title).to.exist;
      expect(err.errors.description).to.exist;
      expect(err.errors.positionType).to.exist;
      expect(err.errors.companyName).to.exist;
      expect(err.errors.contactName).to.exist;
      expect(err.errors.contactEmail).to.exist;
      expect(err.errors.contactPhone).to.exist;
      expect(err.errors.location).to.exist;
      expect(err.errors.dateCreated).to.exist;
      done();
      });
  });
});