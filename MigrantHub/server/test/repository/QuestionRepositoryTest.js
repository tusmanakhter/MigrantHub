var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var { Question } = require('../../models/questions/Question');
var QuestionRepository = require('../../repository/QuestionRepository');
var { ServerError } = require('../../errors/ServerError');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('question repository', function () {
  let req = {
    question:{
        _id: "1"
    },
  };

  it('should successfully call mongodb findOne question', test(function () {
    this.stub(Question, 'findOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
    QuestionRepository.getQuestion(req.question._id);
    assert.calledWith(Question.findOne, { _id: req.question._id });
    }));

  it('should throw error, since there was a error findOne question', test(function () {
    this.stub(Question, 'findOne').returns({exec: sinon.stub().returns(Promise.reject({}))});
    return chai.assert.isRejected(QuestionRepository.getQuestion(req.question._id), ServerError, 'There was an error retrieving question.');
    }));

  it('should successfully call mongodb find questions', test(function () {
    this.stub(Question, 'find').returns({exec: sinon.stub().returns(Promise.resolve({}))});
    QuestionRepository.getQuestions();
    assert.calledWith(Question.find);
    }));

  it('should throw error, since there was a error find questions', test(function () {
    this.stub(Question, 'find').returns({exec: sinon.stub().returns(Promise.reject({}))});
    return chai.assert.isRejected(QuestionRepository.getQuestions(), ServerError, 'There was an error retrieving questions.');
    }));


});
