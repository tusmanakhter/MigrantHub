var db = connect('127.0.0.1:27017/migranthub')
print('Database created');

var yesOption = { optionNumber: 1, answerBody: 'Yes' };
var noOption = { optionNumber: 2, answerBody: 'No' };
var yesNoOptions = [yesOption, noOption];

db.questions.insert({ question: 'Do you have kids?', answerOptions: yesNoOptions });
db.questions.insert({ question: 'Do you speak french?', answerOptions: yesNoOptions });
db.questions.insert({ question: 'Are you a student?', answerOptions: yesNoOptions });
db.questions.insert({ question: 'Do you play sports?', answerOptions: yesNoOptions });

print('Questions created');