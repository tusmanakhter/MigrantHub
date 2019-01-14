const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

module.exports.serviceSuggestion = function () {
  return {
    _id: ObjectId('5c27e524c1ca8a7e90e8847b'),
    deleted: false,
    deletedDate: null,
    serviceTitle: 'test',
    serviceSummary: 'teach testing class',
    category: 'BudgetAndDebtProblems',
    subcategory: '',
  };
};

module.exports.serviceSuggestionObj = function () {
  return {
    serviceTitle: 'test',
    serviceSummary: 'teach testing class',
    category: 'BudgetAndDebtProblems',
    subcategory: '',
  };
};

module.exports.serviceSuggestion2 = function () {
  return {
    _id: ObjectId('5c27e524c1ca8a7e90e8848b'),
    deleted: false,
    deletedDate: null,
    serviceTitle: 'new',
    serviceSummary: 'teach new class',
    category: 'BudgetAndDebtProblems',
    subcategory: '',
  };
};

module.exports.serviceSuggestionObj2 = function () {
  return {
    serviceTitle: 'new',
    serviceSummary: 'teach new class',
    category: 'BudgetAndDebtProblems',
    subcategory: '',
  };
};
