var chai = require('chai');
var expect = chai.expect;
var UserAnswer = require('../../models/questions/UserAnswer');

describe('UserAnswer model', function() {
    it('Should be invalid if user is empty', function(done) {
        var userAnswer = new UserAnswer();

        userAnswer.validate(function(err) {
            expect(err.errors.user).to.exist;
            done();
        });
    });
});