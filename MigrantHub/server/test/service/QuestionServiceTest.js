var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var QuestionService = require('../../service/QuestionService');
var QuestionRepository = require('../../repository/QuestionRepository');
var QuestionFactory = require('../factories/QuestionFactory');
var UserAnswerRepository = require('../../repository/UserAnswerRepository');
var UserAnswerFactory = require('../factories/UserAnswerFactory');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Question Service', function () {
    let req = {
      user: {
          _id: "test@test.com"
      },
    },
    questions = [QuestionFactory.question1(), QuestionFactory.question2(), QuestionFactory.question3()];

    it('getUnansweredQuestions should call getQuestions in repo to retrieve a questions', test(async function () {
      this.stub(QuestionRepository, 'getQuestions').returns(questions);
      this.stub(UserAnswerRepository, 'getUserAnswer').returns(undefined);

      let result = await QuestionService.getUnansweredQuestions(req.user._id);
      assert.calledWith(UserAnswerRepository.getUserAnswer, { user: req.user._id});
      assert.calledOnce(QuestionRepository.getQuestions);
      chai.assert.equal(3, result.length);
    }));

    it('getUnansweredQuestions should return filtered questions if already answered', test(async function () {
      this.stub(QuestionRepository, 'getQuestions').returns(questions);
      this.stub(UserAnswerRepository, 'getUserAnswer').returns(UserAnswerFactory.userAnswer());

      let result = await QuestionService.getUnansweredQuestions(req.user._id);
      assert.calledWith(UserAnswerRepository.getUserAnswer, { user: req.user._id});
      assert.calledOnce(QuestionRepository.getQuestions);
      chai.assert.equal(2, result.length);
    }));
});