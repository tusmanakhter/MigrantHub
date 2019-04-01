var chai = require('chai');
var expect = chai.expect;
var { Question } = require('../../models/questions/Question');

describe('Question model', function() {
    it('Should be invalid if question is empty', function(done) {
        var question = new Question();

        question.validate(function(err) {
            expect(err.errors.question).to.exist;
            done();
        });
    });
});