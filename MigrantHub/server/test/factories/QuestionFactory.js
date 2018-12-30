const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

module.exports.question1 = function () {
  return {
    _id: ObjectId('5c27e4e475dac20cd6fa5b49'),
    question: 'Do you have kids?',
    answerOptions: [
      {
        optionNumber: 1,
        answerBody: 'Yes',
      },
      {
        optionNumber: 2,
        answerBody: 'No',
      },
    ],
  };
};

module.exports.question2 = function () {
  return {
    _id: ObjectId('5c27e4e475dac20cd6fa5b4a'),
    question: 'Do you speak french?',
    answerOptions: [
      {
        optionNumber: 1,
        answerBody: 'Yes',
      },
      {
        optionNumber: 2,
        answerBody: 'No',
      },
    ],
  };
};

module.exports.question3 = function () {
  return {
    _id: ObjectId('5c27e4e475dac20cd6fa5b4c'),
    question: 'Do you play sports?',
    answerOptions: [
      {
        optionNumber: 1,
        answerBody: 'Yes',
      },
      {
        optionNumber: 2,
        answerBody: 'No',
      },
    ],
  };
};
