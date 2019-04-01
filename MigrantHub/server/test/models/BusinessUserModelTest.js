var expect = require('chai').expect;

var BusinessUser = require('../../models/BusinessUser');

describe('Bug', function() {
  it('should be invalid if corpId, firstName, lastName, address, apartment, city, province, postalCode, ' +
    'phoneNumber, organizationName, orgType, department, serviceType or description is empty', function(done) {
    var businessUser = new BusinessUser();

    businessUser.validate(function(err) {
      expect(err.errors.corpId).to.exist;
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.address).to.exist;
      expect(err.errors.city).to.exist;
      expect(err.errors.province).to.exist;
      expect(err.errors.postalCode).to.exist;
      expect(err.errors.phoneNumber).to.exist;
      expect(err.errors.organizationName).to.exist;
      expect(err.errors.orgType).to.exist;
      expect(err.errors.department).to.exist;
      expect(err.errors.serviceType).to.exist;
      expect(err.errors.description).to.exist;
      done();
      });
  });
});