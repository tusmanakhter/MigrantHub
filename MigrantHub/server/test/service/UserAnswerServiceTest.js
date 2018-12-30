var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var UserAnswerService = require('../../service/UserAnswerService');
var UserAnswerRepository = require('../../repository/UserAnswerRepository');
var UserAnswerFactory = require('../factories/UserAnswerFactory');
var QuestionRepository = require('../../repository/QuestionRepository');
var QuestionFactory = require('../factories/QuestionFactory');
var { ServerError } = require('../../errors/ServerError');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('User Answer Service', function () {
  let req = {
    user: {
      _id: "test@test.com"
    },
    body: {
      questionAnswer: UserAnswerFactory.questionAnswer2(),
    }
  };

  it('should call createUserAnswer in repo with correct parameters from addUserAnswer method', test(async function () {
    this.stub(UserAnswerRepository, 'createUserAnswer');
    this.stub(UserAnswerRepository, 'getUserAnswer').returns(undefined);
    this.stub(QuestionRepository, 'getQuestion').returns(QuestionFactory.question3());
    await UserAnswerService.addUserAnswer(req.user._id, req.body.questionAnswer);
    assert.calledWith(UserAnswerRepository.getUserAnswer, {user: "test@test.com"});
    assert.calledWith(QuestionRepository.getQuestion, '5c27e4e475dac20cd6fa5b4c');
    assert.calledWith(UserAnswerRepository.createUserAnswer, req.user._id, UserAnswerFactory.questionAnswerObj2());
  }));

  
  it('should call updateUserAnswer in repo with correct parameters from addUserAnswer method', test(async function () {
    this.stub(UserAnswerRepository, 'updateUserAnswer');
    this.stub(UserAnswerRepository, 'getUserAnswer').returns(UserAnswerFactory.userAnswer());
    this.stub(QuestionRepository, 'getQuestion').returns(QuestionFactory.question3());
    await UserAnswerService.addUserAnswer(req.user._id, req.body.questionAnswer);
    assert.calledWith(UserAnswerRepository.getUserAnswer, {user: "test@test.com"});
    assert.calledWith(QuestionRepository.getQuestion, '5c27e4e475dac20cd6fa5b4c');
    assert.calledWith(UserAnswerRepository.updateUserAnswer, UserAnswerFactory.userAnswer()._id, UserAnswerFactory.questionAnswerObj2());
  }));

  it('should call not call any methods in repo and throw error if answer exists', test(async function () {
    this.stub(UserAnswerRepository, 'updateUserAnswer');
    this.stub(UserAnswerRepository, 'getUserAnswer').returns(UserAnswerFactory.userAnswer2());
    this.stub(QuestionRepository, 'getQuestion').returns(QuestionFactory.question3());
    chai.assert.isRejected(UserAnswerService.addUserAnswer(req.user._id, req.body.questionAnswer), ServerError, 'There was an error adding answer.');
  }));
});
