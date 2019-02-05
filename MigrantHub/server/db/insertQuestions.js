#! /usr/bin/env node

const mongoose = require('mongoose');
const { dbConnectionString } = require('../config');
const { Question } = require('../models/questions/Question');

const connectionString = dbConnectionString();

const yesOption = { optionNumber: 1, answerBody: 'Yes' };
const noOption = { optionNumber: 2, answerBody: 'No' };
const yesNoOptions = [yesOption, noOption];
const questions = ['Do you have kids?', 'Do you speak french?', 'Are you a student?', 'Do you play sports?'];

async function insertQuestions() {
  const promises = [];
  for (let i = 0; i < questions.length; i += 1) {
    const question = new Question();
    question.question = questions[i];
    question.answerOptions = yesNoOptions;
    promises.push(question.save());
  }
  await Promise.all(promises);
}

async function run() {
  console.log('Starting question seeding...');
  mongoose.connect(connectionString);
  await insertQuestions();
  mongoose.disconnect();
  console.log('Question seeding complete');
}

run();
