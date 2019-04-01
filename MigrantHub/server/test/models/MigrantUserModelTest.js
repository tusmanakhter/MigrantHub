var expect = require('chai').expect;

var MigrantUser = require('../../models/MigrantUser');

describe('MigrantUser', function() {
  it('should be invalid if _id, userType or email is empty', function(done) {
    var migrantUser = new MigrantUser();

    migrantUser.validate(function(err) {
      expect(err.errors._id).to.exist;
      expect(err.errors.userType).to.exist;
      expect(err.errors.email).to.exist;
      done();
      });
  });
});