const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

module.exports.userAnswer = function () {
  return {
    _id: ObjectId('5c27e524c1ca8a7e90e8847b'),
    questionAnswers: [
      {
        _id: ObjectId('5c27e524c1ca8a7e90e8847c'),
        question: {
          _id: ObjectId('5c27e4e475dac20cd6fa5b4a'),
          question: 'Do you speak french?',
        },
        answerOption: {
          _id: ObjectId('5c27e524c1ca8a7e90e8847e'),
          optionNumber: 1,
          answerBody: 'Yes',
        },
      },
    ],
    user: 'test@test.com',
  };
};

module.exports.questionAnswer = function () {
  return {
    question: {
      _id: ObjectId('5c27e4e475dac20cd6fa5b4a'),
      question: 'Do you speak french?',
    },
    answerOption: 1,
  };
};

module.exports.questionAnswerObj = function () {
  return {
    question: {
      _id: ObjectId('5c27e4e475dac20cd6fa5b4a'),
      question: 'Do you speak french?',
    },
    answerOption: {
      optionNumber: 1,
      answerBody: 'Yes',
    },
  };
};

module.exports.userAnswer2 = function () {
  return {
    _id: ObjectId('5c27e524c1ca8a7e90e8947b'),
    questionAnswers: [
      {
        _id: ObjectId('5c27e524c1ca8a7e90e8947c'),
        question: {
          _id: ObjectId('5c27e4e475dac20cd6fa5b4c'),
          question: 'Do you play sports?',
        },
        answerOption: {
          _id: ObjectId('5c27e524c1ca8a7e90e8847e'),
          optionNumber: 1,
          answerBody: 'Yes',
        },
      },
    ],
    user: 'test@test.com',
  };
};

module.exports.questionAnswer2 = function () {
  return {
    question: '5c27e4e475dac20cd6fa5b4c',
    answerOption: 1,
  };
};

module.exports.questionAnswerObj2 = function () {
  return {
    question: {
      _id: ObjectId('5c27e4e475dac20cd6fa5b4c'),
      question: 'Do you play sports?',
    },
    answerOption: {
      optionNumber: 1,
      answerBody: 'Yes',
    },
  };
};
