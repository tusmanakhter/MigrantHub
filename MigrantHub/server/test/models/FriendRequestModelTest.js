var expect = require('chai').expect;

var FriendRequest = require('../../models/FriendRequest');

describe('FriendRequest', function() {
  it('should be invalid if requestFrom or requestTo is empty', function(done) {
    var friendRequest = new FriendRequest();

    friendRequest.validate(function(err) {
      expect(err.errors.requestFrom).to.exist;
      expect(err.errors.requestTo).to.exist;
      done();
      });
  });
});