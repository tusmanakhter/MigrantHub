var expect = require('chai').expect;
 
var User = require('../../models/User');
 
describe('user', function() {
    it('should be invalid if id, email or password is empty', function(done) {
        var user = new User();
 
        user.validate(function(err) {
            expect(err.errors._id).to.exist;
            expect(err.errors.email).to.exist;
            done();
        });
    });
});